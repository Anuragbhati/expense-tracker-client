import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../store/slices/categorySlice";

const Form = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CategoryForm = ({ editCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#3498db",
    _id: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.categories);

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name,
        color: editCategory.color,
        _id: editCategory._id,
      });
    }
  }, [editCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      dispatch(updateCategory({ id: formData._id, categoryData: formData }));
    } else {
      dispatch(createCategory(formData));
    }
    setFormData({ name: "", color: "#3498db", _id: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Category Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Color</Label>
        <Input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading
          ? "Processing..."
          : formData._id
          ? "Update Category"
          : "Add Category"}
      </Button>
    </Form>
  );
};

export default CategoryForm;
