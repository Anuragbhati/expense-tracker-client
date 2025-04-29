import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: ${({ hasSidebar }) => (hasSidebar ? "250px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Layout = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (!token && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        {/* {token && <Header />} */}
        <MainContent hasSidebar={!isAuthPage}>
          {token && <Sidebar />}
          <Content>{children}</Content>
        </MainContent>
      </AppLayout>
    </ThemeProvider>
  );
};

export default Layout;
