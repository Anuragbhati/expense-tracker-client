import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import { fetchExpenses } from "../../store/slices/expenseSlice";
import { useEffect } from "react";

const List = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
`;

const ExpenseList = ({ onEdit }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);
  const expenses = useSelector((state) => state.expenses.items);

  return (
    <List>
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} onEdit={onEdit} />
      ))}
    </List>
  );
};

export default ExpenseList;
