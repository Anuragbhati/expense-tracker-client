import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.aside`
  width: 250px;
  background: ${({ theme }) => theme.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding-top: 70px;
  z-index: 90;
`;

const AppTitle = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }

  i {
    width: 20px;
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.danger};
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  i {
    width: 20px;
    text-align: center;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <SidebarContainer>
        <AppTitle>Expense Tracker</AppTitle>
        <SidebarNav>
          <SidebarLink
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </SidebarLink>
          <SidebarLink
            to="/expenses"
            className={location.pathname === "/expenses" ? "active" : ""}
          >
            <i className="fas fa-receipt"></i>
            <span>Expenses</span>
          </SidebarLink>
          <SidebarLink
            to="/categories"
            className={location.pathname === "/categories" ? "active" : ""}
          >
            <i className="fas fa-tags"></i>
            <span>Categories</span>
          </SidebarLink>

          <LogoutButton onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </LogoutButton>
        </SidebarNav>
      </SidebarContainer>
    </ThemeProvider>
  );
};

export default Sidebar;
