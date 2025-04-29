import api from "./api";

const API_URL = "/analytics";

const getExpenseAnalytics = async () => {
  const response = await api.get(`${API_URL}/expenses`);
  return response.data;
};

const getCategoryWiseAnalytics = async () => {
  const response = await api.get(`${API_URL}/category-wise`);
  return response.data;
};

const getMonthlyAnalytics = async () => {
  const response = await api.get(`${API_URL}/monthly`);
  return response.data;
};

export const analyticsService = {
  getExpenseAnalytics,
  getCategoryWiseAnalytics,
  getMonthlyAnalytics,
};
