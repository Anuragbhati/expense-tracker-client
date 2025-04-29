import styled from "styled-components";

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error || "#dc3545"};
  background-color: ${({ theme }) => theme.colors.errorBg || "#f8d7da"};
  border: 1px solid ${({ theme }) => theme.colors.errorBorder || "#f5c6cb"};
  border-radius: ${({ theme }) => theme.borderRadius.sm || "4px"};
  padding: 0.75rem 1.25rem;
  margin: 1rem 0;
  font-size: 0.875rem;
`;

export default ErrorMessage;
