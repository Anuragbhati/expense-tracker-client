import React from "react";
import {
  PieChart,
  Pie,
  Cell,
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

function CategoryChart({ data }) {
  const formattedData = React.useMemo(
    () =>
      data?.map((item) => ({
        name: item.category?.name || "Uncategorized",
        value: item.total,
        color: item.category?.color || "#8884d8",
      })),
    [data]
  );

  const [activeIndex, setActiveIndex] = React.useState(null);
  const onPieEnter = React.useCallback((_, index) => setActiveIndex(index), []);
  const onPieLeave = React.useCallback(() => setActiveIndex(null), []);

  return (
    <ChartContainer>
      <Title>Expense by Category</Title>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            innerRadius={60}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => (
              <tspan x={0} dy={16} fill="#333">
                {name}: {(percent * 100).toFixed(0)}%
              </tspan>
            )}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            activeIndex={activeIndex}
            activeShape={{
              outerRadius: 130,
              innerRadius: 70,
            }}
          >
            {formattedData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value}`, "Amount"]}
            contentStyle={{
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            formatter={(value, entry, index) => (
              <span style={{ color: "#333" }}>
                {value}: ${formattedData?.[index]?.value.toFixed(2)}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default CategoryChart;
