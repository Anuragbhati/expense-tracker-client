import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

function SummaryStats({ totalAmount, highest, lowest }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <StatsContainer>
      <StatCard>
        <StatValue>{formatCurrency(totalAmount)}</StatValue>
        <StatLabel>Total Expenses</StatLabel>
      </StatCard>
      <StatCard>
        <StatValue>{formatCurrency(totalAmount / 12)}</StatValue>
        <StatLabel>Average Monthly</StatLabel>
      </StatCard>
      <StatCard>
        <StatValue>{highest}</StatValue>
        <StatLabel>Highest Month</StatLabel>
      </StatCard>
      <StatCard>
        <StatValue>{lowest}</StatValue>
        <StatLabel>Lowest Month</StatLabel>
      </StatCard>
    </StatsContainer>
  );
}

export default SummaryStats;
