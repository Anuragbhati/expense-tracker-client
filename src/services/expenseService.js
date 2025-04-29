import api from "./api";

export const expenseService = {
  getAllExpenses: async () => {
    const response = await api.get("/expenses");
    return response.data;
  },

  createExpense: async (expenseData) => {
    const response = await api.post("/expenses", expenseData);
    return response.data;
  },

  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  getExpensesByCategory: async (categoryId) => {
    const response = await api.get(`/expenses/category/${categoryId}`);
    return response.data;
  },
};
