import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <NavContainer>
          <Logo to="/">Expense Tracker</Logo>
          <NavLinks>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/expenses">Expenses</NavLink>
            <NavLink to="/categories">Categories</NavLink>
          </NavLinks>
        </NavContainer>
      </Nav>
    </ThemeProvider>
  );
};

export default Navbar;
