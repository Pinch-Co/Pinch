/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

interface Props {
  chartData: any;
  total: number;
  income: number;
  chartType: string;
  setChartType: Function;
}

const BudgetCharts: React.FC<Props> = ({
  chartData, total, income, chartType, setChartType,
}) => {
  const [localData, setLocalData] = useState<any>();

  useEffect(() => {
    setLocalData(chartData);
  }, [chartData]);

  const changeChartType = (e: any) => {
    e.preventDefault();
    setChartType(e.target.value);
  };

  return (
    <div className="bb-chart-div">
      <div className="bb-chart">
        <ResponsiveContainer>
          {chartType === 'pie'
            ? (
              <>
                <PieChart width={600} height={600}>
                  <Pie
                    data={localData}
                    dataKey="value"
                    label
                    fill="#61aaa4"
                  />
                </PieChart>
              </>
            ) : (
              <>
                <BarChart
                  width={600}
                  height={600}
                  data={localData}
                  margin={{
                    top: 30, right: 30, left: 0, bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis dataKey="value" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#61aaa4" label={{ position: 'top' }} />
                </BarChart>
              </>
            )}
        </ResponsiveContainer>
      </div>
      <div className="bb-chart-data">
        $
        {total}
        {' / '}
        $
        {income}
      </div>
      <select className="bb-chart-type" onChange={(e: any) => changeChartType(e)}>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Graph</option>
      </select>
    </div>
  );
};

export default BudgetCharts;
