import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, modifyExpense } from "../../store/slices/expenseSlice";
import ErrorMessage from "../common/ErrorMessage";
import { fetchCategories } from "../../store/slices/categorySlice";

const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const Button = styled.button`
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.disabled || "#ccc" : theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme, disabled }) =>
      disabled
        ? theme.colors.disabled || "#ccc"
        : theme.colors.primaryHover || theme.colors.primary};
  }
`;

const ExpenseForm = ({ editExpense }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0],
    _id: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    if (editExpense) {
      setFormData({
        amount: editExpense.amount.toString(),
        description: editExpense.description,
        categoryId: editExpense.category?._id || "",
        date: editExpense.date.split("T")[0],
        _id: editExpense._id,
      });
    }
  }, [dispatch, editExpense]);
  const categories = useSelector((state) => state.categories.items);

  const { loading, error } = useSelector((state) => state.expenses);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await dispatch(
          modifyExpense({ id: formData._id, expenseData: formData })
        ).unwrap();
      } else {
        await dispatch(createExpense(formData)).unwrap();
      }
      setFormData({
        amount: "",
        description: "",
        categoryId: "",
        date: new Date().toISOString().split("T")[0],
        _id: "",
      });
    } catch (err) {
      console.error("Failed to process expense:", err);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Expense error:", error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Amount</Label>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Category</Label>
        <Select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <i className="bi bi-arrow-clockwise"></i> Processing...
          </>
        ) : formData._id ? (
          <>
            <i className="bi bi-save"></i> Update Expense
          </>
        ) : (
          <>
            <i className="bi bi-plus"></i> Add Expense
          </>
        )}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default ExpenseForm;
