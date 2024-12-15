import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!process.env.NEXT_PUBLIC_JWT_SECRET || !process.env.IPINFO_API_TOKEN) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    try {
      const { db } = await connectToDatabase();
      const ipAddress =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.connection.remoteAddress;
      const isLocalhost =
        ipAddress.startsWith("127.0.0.1") ||
        ipAddress === "::1" ||
        ipAddress === "localhost";

      const authToken = "AZ-fc905a5a5ae08609ba38b046ecc8ef00"; // Bearer <token>
      if (!authToken) {
        return res
          .status(401)
          .json({ message: "Authorization token is required" });
      }

      const attemptRecord = await db
        .collection("failed_logins")
        .findOne({ ipAddress });
      if (
        attemptRecord &&
        attemptRecord.blockUntil &&
        new Date() < new Date(attemptRecord.blockUntil)
      ) {
        return res
          .status(429)
          .json({ message: "Too many failed attempts. Try again later." });
      }

      const user = await db.collection("user").findOne({ email });
      if (!user) {
        await handleFailedAttempt(db, ipAddress);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (!user.verified) {
        return res
          .status(400)
          .json({ message: "Please verify your email before logging in." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        await handleFailedAttempt(db, ipAddress);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      await db.collection("failed_logins").deleteOne({ ipAddress });

      const jwtToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userAgent = req.headers["user-agent"];
      const browser = userAgent.includes("Chrome")
        ? "Chrome"
        : userAgent.includes("Firefox")
        ? "Firefox"
        : "Other";
      const os = userAgent.includes("Windows")
        ? "Windows"
        : userAgent.includes("Mac")
        ? "MacOS"
        : "Other";

      let country = "Unknown";
      let city = "Unknown";
      if (!isLocalhost) {
        try {
          const geoResponse = await fetch(
            `https://ipinfo.io/${ipAddress}?token=${process.env.IPINFO_API_TOKEN}`
          );
          if (!geoResponse.ok) {
            throw new Error(
              `Failed to fetch geolocation: ${geoResponse.statusText}`
            );
          }
          const geoData = await geoResponse.json();
          country = geoData.country || "Unknown";
          city = geoData.city || "Unknown";
        } catch (error) {
          console.error("Error fetching geolocation:", error);
        }
      } else {
        country = "Localhost";
        city = "Localhost";
      }

      await db.collection("login_logs").insertOne({
        userId: user._id,
        userName: user.username,
        ipAddress,
        browser,
        os,
        city,
        country,
        timestamp: new Date(),
      });

      return res.status(200).json({
        message: "Login successful",
        token: jwtToken,
        loginInfo: { ipAddress, browser, os, city, country },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const logs = await db.collection("login_logs").find({}).toArray();
      return res.status(200).json({ success: true, data: logs });
    } catch (error) {
      console.error("Error fetching login logs:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

async function handleFailedAttempt(db, ipAddress) {
  try {
    const record = await db.collection("failed_logins").findOne({ ipAddress });
    if (record) {
      if (record.attempts >= 2) {
        await db
          .collection("failed_logins")
          .updateOne(
            { ipAddress },
            {
              $set: {
                attempts: record.attempts + 1,
                blockUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
              },
            }
          );
      } else {
        await db
          .collection("failed_logins")
          .updateOne({ ipAddress }, { $inc: { attempts: 1 } });
      }
    } else {
      await db
        .collection("failed_logins")
        .insertOne({ ipAddress, attempts: 1 });
    }
  } catch (error) {
    console.error("Error handling failed login attempt:", error);
  }
}
