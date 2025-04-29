import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

function MonthlyChart({ data }) {
  const formattedData = data?.map(item => ({
    month: `${new Date(0, item._id.month - 1).toLocaleString('default', { month: 'long' })} ${item._id.year}`,
    amount: item.total
  }));

  return (
    <ChartContainer>
      <Title>Monthly Expenses</Title>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{ 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
          <Bar 
            dataKey="amount" 
            fill="#3498db"
            name="Expenses"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default MonthlyChart;
