import React, { useEffect, useState } from 'react';
import Layout from './layout';
import { useAuth } from '../../contexts/AuthContext';
import moment from 'moment';
import ChartComponent from './ChartComponent';
import UserProfile from '../../components/UserProfile';
import { Line, Pie } from 'react-chartjs-2';
import {
  FaUsers, FaUserCheck, FaEnvelope, FaCrown, FaUserAlt, FaFileAlt,
  FaTools, FaStar, FaSitemap, FaChartLine, FaSignInAlt, FaChevronRight
} from 'react-icons/fa';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filter, setFilter] = useState('yearly');
  const [loading, setLoading] = useState(true);

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [premiumUsers, setPremiumUsers] = useState(0);
  const [articles, setArticles] = useState(0);
  const [nonPremiumUsers, setNonPremiumUsers] = useState(0);
  const [emailUnverifiedUsers, setEmailUnverifiedUsers] = useState(0);
  const [siteViews, setSiteViews] = useState(0);
  const [blogChartData, setBlogChartData] = useState(null);
  const [browserStats, setBrowserStats] = useState({});
  const [osStats, setOsStats] = useState({});
  const [countryStats, setCountryStats] = useState({});
  const [activeLogin, setActiveLogin] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [pages, setPages] = useState([]);

  const fetchData = async (filter) => {
    try {
      const response = await fetch(`/api/user-visits?filter=${filter}`);
      const data = await response.json();
      setChartData(data.map(item => item.value));
      setLabels(data.map(item => item.date));
    } catch (error) {
      console.error('Error fetching user visits:', error);
    }
  };

  const fetchSiteViews = async (filter) => {
    try {
      const response = await fetch(`/api/get-visit-count?filter=${filter}`);
      const data = await response.json();
      setSiteViews(data.visitCount);
    } catch (error) {
      console.error('Error fetching site views:', error);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchAllData = async () => {
        setLoading(true);
        try {
          const [
            siteViewsResponse,
            userVisitsResponse,
            userListResponse,
            loginStatsResponse,
            activeSessionsResponse,
            reviewsResponse,
            pagesResponse
          ] = await Promise.all([
            fetch(`/api/get-visit-count?filter=${filter}`),
            fetch(`/api/user-visits?filter=${filter}`),
            fetch('/api/user-list', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
            fetch('/api/get-login-stats'),
            fetch('/api/active-sessions'),
            fetch('/api/reviews'),
            fetch('/api/pages')
          ]);

          if ([
            siteViewsResponse, userVisitsResponse, userListResponse, 
            loginStatsResponse, activeSessionsResponse, reviewsResponse, 
            pagesResponse
          ].some(res => !res.ok)) {
            throw new Error('Failed to fetch one or more resources');
          }

          const siteViewsData = await siteViewsResponse.json();
          const userVisitsData = await userVisitsResponse.json();
          const userListData = await userListResponse.json();
          const loginStatsData = await loginStatsResponse.json();
          const activeSessionsData = await activeSessionsResponse.json();
          const reviewsData = await reviewsResponse.json();
          const pagesData = await pagesResponse.json();

          setSiteViews(siteViewsData.visitCount);
          setChartData(userVisitsData.map(item => item.value));
          setLabels(userVisitsData.map(item => item.date));

          const premiumUserCount = userListData.data.filter(user => user.paymentStatus === 'success').length;
          setTotalUsers(userListData.data.length);
          setActiveUsers(userListData.data.filter(user => user.verified).length);
          setPremiumUsers(premiumUserCount);
          setNonPremiumUsers(userListData.data.length - premiumUserCount);
          setEmailUnverifiedUsers(userListData.data.filter(user => !user.verified).length);
          setActiveLogin(activeSessionsData.activeUsers);

          setBrowserStats({
            labels: loginStatsData.browserStats.map(item => item._id),
            datasets: [{
              data: loginStatsData.browserStats.map(item => item.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA726', '#66BB6A']
            }]
          });

          setOsStats({
            labels: loginStatsData.osStats.map(item => item._id),
            datasets: [{
              data: loginStatsData.osStats.map(item => item.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA726', '#66BB6A']
            }]
          });

          setCountryStats({
            labels: loginStatsData.countryStats.map(item => item._id),
            datasets: [{
              data: loginStatsData.countryStats.map(item => item.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA726', '#66BB6A']
            }]
          });

          setReviews(reviewsData);
          setPages(pagesData);

          setBlogChartData({
            labels: userVisitsData.map(item => moment(item.date).format('YYYY-MM-DD')),
            datasets: [{
              label: 'Blogs Published',
              data: userVisitsData.map(() => 1),
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: true
            }]
          });

          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchAllData();
    }
  }, [user, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchData(newFilter);
    fetchSiteViews(newFilter);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Hi, {user?.username}</h1>
      {user?.role !== 'admin' && <UserProfile />}
      {user?.role === 'admin' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total Users', count: totalUsers, icon: FaUsers, color: 'purple' },
              { label: 'Email Verified Users', count: activeUsers, icon: FaUserCheck, color: 'green' },
              { label: 'Email Unverified Users', count: emailUnverifiedUsers, icon: FaEnvelope, color: 'red' },
              { label: 'Premium Users', count: premiumUsers, icon: FaCrown, color: 'yellow' },
              { label: 'Non-Premium Users', count: nonPremiumUsers, icon: FaUserAlt, color: 'gray' },
              { label: 'Total Articles', count: articles, icon: FaFileAlt, color: 'gray' },
              { label: 'Total Tools', count: reviews.length, icon: FaTools, color: 'gray' },
              { label: 'Total Pages', count: pages.length, icon: FaSitemap, color: 'gray' },
              { label: 'Total Visits', count: siteViews, icon: FaChartLine, color: 'gray' },
              { label: 'Total Logins', count: activeLogin, icon: FaSignInAlt, color: 'blue' },
            ].map(({ label, count, icon: Icon, color }, idx) => (
              <Link key={idx} href="#">
                <div className={`flex items-center border rounded-lg bg-${color}-100 shadow-md hover:shadow-lg transition-all p-4`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-${color}-200 rounded-md`}>
                      <Icon className={`text-${color}-500`} />
                    </div>
                    <div>
                      <p className="text-gray-600">{label}</p>
                      <h3 className="text-2xl font-bold">{count}</h3>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-500 ml-auto" />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="p-6 border border-teal-500 rounded-lg bg-white">
              <h2 className="text-lg font-semibold text-black mb-4">Blog Report</h2>
              {blogChartData ? (
                <Line data={blogChartData} />
              ) : (
                <p>No data available</p>
              )}
            </div>
            <div className="p-6 border border-teal-500 rounded-lg bg-white">
              <select
                onChange={(e) => handleFilterChange(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4"
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
              <ChartComponent data={chartData} labels={labels} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[browserStats, osStats, countryStats].map((stats, idx) => (
              <div key={idx} className="p-6 border border-teal-500 rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-black mb-4">
                  {['Login By Browser', 'Login By OS', 'Login By Country'][idx]}
                </h2>
                {!loading && (
                  <Pie data={stats} options={{ responsive: true, maintainAspectRatio: true }} />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
