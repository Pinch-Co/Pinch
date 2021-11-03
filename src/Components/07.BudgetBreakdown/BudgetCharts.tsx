import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

interface Props {
  chartData: any;
}

const BudgetCharts: React.FC<Props> = ({ chartData }) => {
  const [localData, setLocalData] = useState<any>();
  useEffect(() => {
    if (chartData.length) {
      const newData = [...chartData];
      for (let i = 0; i < newData.length; i += 1) {
        const temp = newData[i].amount;
        delete newData[i].amount;
        newData[i].value = temp;
      }
      setLocalData(newData);
      console.log('old data:', chartData);
      console.log('new data:', newData);
    }
  }, [chartData]);

  return (
    <div>
      <div className="bb-chart">
        <PieChart width={400} height={400}>
          <Pie data={localData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#3b95ac" />
        </PieChart>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Turkish_general_election%2C_2007_pie_chart.png" alt="pie chart" className="bb-pie-chart" /> */}
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
