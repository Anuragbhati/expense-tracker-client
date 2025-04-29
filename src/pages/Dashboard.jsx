import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { useEffect, useState } from "react";
import { analyticsService } from "../services/analyticsService";
import AnalyticsSummary from "../components/analytics/SummaryStats";
import CategoryAnalytics from "../components/analytics/CategoryChart";
import MonthlyAnalytics from "../components/analytics/MonthlyChart";

const DashboardContainer = styled.div`
  padding: 2rem;
  display: grid;
  gap: 2rem;
`;

const DashboardHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  grid-column: 1 / -1;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [highestMonth, setHighestMonth] = useState(0);
  const [lowestMonth, setLowestMonth] = useState(0);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dispatch]);

  const fetchAnalyticsData = async () => {
    try {
      const [total, categories, monthly] = await Promise.all([
        analyticsService.getExpenseAnalytics(),
        analyticsService.getCategoryWiseAnalytics(),
        analyticsService.getMonthlyAnalytics(),
      ]);

      setTotalAmount(total.totalAmount);
      setCategoryData(categories);
      if (monthly.length > 0) {
        const sortedMonthly = [...monthly].sort((a, b) => b.total - a.total);
        console.log(sortedMonthly, "SortedMonthly");
        setHighestMonth(sortedMonthly[0]?.total || 0);
        setLowestMonth(sortedMonthly[sortedMonthly.length - 1]?.total || 0);
      }

      setMonthlyData(monthly);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardContainer>
        <DashboardHeader>Dashboard</DashboardHeader>
        <AnalyticsSummary
          totalAmount={totalAmount}
          highest={highestMonth}
          lowest={lowestMonth}
        />

        <CategoryAnalytics data={categoryData} />
        <MonthlyAnalytics data={monthlyData} />
      </DashboardContainer>
    </ThemeProvider>
  );
};

export default Dashboard;
