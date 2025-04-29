import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
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

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.dangerHover || "#c0392b"};
  }
`;

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <Container>
          <Logo to="/">Expense Tracker</Logo>
          <Nav>
            <button className="hamburger" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/expenses">Expenses</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </Nav>
        </Container>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;
