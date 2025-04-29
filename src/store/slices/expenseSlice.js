import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { expenseService } from "../../services/expenseService";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      return await expenseService.getAllExpenses();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expenses"
      );
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async (expenseData, { rejectWithValue }) => {
    try {
      return await expenseService.createExpense(expenseData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create expense"
      );
    }
  }
);

export const modifyExpense = createAsyncThunk(
  "expenses/modifyExpense",
  async ({ id, expenseData }, { rejectWithValue }) => {
    try {
      return await expenseService.updateExpense(id, expenseData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update expense"
      );
    }
  }
);

export const removeExpense = createAsyncThunk(
  "expenses/removeExpense",
  async (id, { rejectWithValue }) => {
    try {
      await expenseService.deleteExpense(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Expenses
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Expense
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Expense
      .addCase(modifyExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(modifyExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Expense
      .addCase(removeExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  setExpenses,
  clearExpenses,
  setLoading,
} = expenseSlice.actions;

export default expenseSlice.reducer;
