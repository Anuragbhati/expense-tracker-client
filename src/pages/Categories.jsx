import styled from "styled-components";

import { useEffect, useState } from "react";
import CategoryForm from "../components/categories/CategoryForm";
import CategoryList from "../components/categories/CategoryList";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { fetchCategories } from "../store/slices/categorySlice";
import { useDispatch } from "react-redux";

const CategoriesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const [editCategory, setEditCategory] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <CategoriesContainer>
        <Header>Categories</Header>
        <CategoryForm editCategory={editCategory} />
        <CategoryList onEdit={setEditCategory} />
      </CategoriesContainer>
    </ThemeProvider>
  );
};

export default Categories;
