import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory } from "../../store/slices/categorySlice";

const List = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorIndicator = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryList = () => {
  const categories = useSelector((state) => state.categories.items);
  const dispatch = useDispatch();

  return (
    <List>
      {categories.map((category) => (
        <CategoryItem key={category._id}>
          <CategoryName>
            <ColorIndicator color={category.color} />
            {category.name}
          </CategoryName>
          <DeleteButton onClick={() => dispatch(deleteCategory(category._id))}>
            <i className="bi bi-trash"></i> Delete
          </DeleteButton>
        </CategoryItem>
      ))}
    </List>
  );
};

export default CategoryList;
