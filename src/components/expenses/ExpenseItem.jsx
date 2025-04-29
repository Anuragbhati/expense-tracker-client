import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeExpense } from "../../store/slices/expenseSlice";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme.js";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ExpenseInfo = styled.div`
  flex-grow: 1;
`;

const Description = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Category = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

const Amount = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 1rem;
`;

const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.warning};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  margin-right: 0.5rem;
`;

const DeleteButton = styled.button`
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
`;

const ExpenseItem = ({ expense, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeExpense(expense._id));
  };

  const handleEdit = () => {
    onEdit(expense);
  };

  return (
    <ThemeProvider theme={theme}>
      <Item>
        <ExpenseInfo>
          <Description>{expense?.description}</Description>
          <Category>{expense?.category?.name}</Category>
        </ExpenseInfo>
        <Amount>${expense?.amount?.toFixed(2)}</Amount>
        <div>
          <EditButton onClick={handleEdit}>
            <i className="bi bi-pencil"></i>
          </EditButton>
          <DeleteButton onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </DeleteButton>
        </div>
      </Item>
    </ThemeProvider>
  );
};

export default ExpenseItem;
