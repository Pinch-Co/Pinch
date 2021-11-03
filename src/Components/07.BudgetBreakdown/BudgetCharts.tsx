import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

interface Props {
  chartData: any;
}

const BudgetCharts: React.FC<Props> = ({ chartData }) => {
  const [localData, setLocalData] = useState<any>();
  useEffect(() => {
    setLocalData(chartData);
  }, [chartData]);

  return (
    <div>
      <div className="bb-chart">
        <PieChart width={400} height={400}>
          <Pie data={localData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#3b95ac" />
        </PieChart>
      </div>
      <select className="bb-chart-type">
        <option value="Pie Chart">Pie Chart</option>
        <option value="Line Graph">Line Graph</option>
        <option value="Bar Graph">Bar Graph</option>
      </select>
    </div>
  );
};

export default BudgetCharts;
