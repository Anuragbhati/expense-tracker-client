import styled from "styled-components";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { useState } from "react";

const ExpensesContainer = styled.div`
  padding: 2rem;
`;

const ExpensesHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const Expenses = () => {
  const [editExpense, setEditExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditExpense(expense);
  };

  return (
    <ThemeProvider theme={theme}>
      <ExpensesContainer>
        <ExpensesHeader>Expenses</ExpensesHeader>
        <ExpenseForm editExpense={editExpense} />
        <ExpenseList onEdit={handleEdit} />
      </ExpensesContainer>
    </ThemeProvider>
  );
};

export default Expenses;
