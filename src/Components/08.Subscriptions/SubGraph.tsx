import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart, Line, CartesianGrid, XAxis,
  YAxis, Tooltip, Legend,
} from 'recharts';
// import axios from 'axios';

interface SubData {
  charData: any
}

const SubGraph: React.FC<SubData> = ({ charData }) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(charData);
  }, [charData]);
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <ResponsiveContainer>
      <LineChart
        width={530}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#36c2bb" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SubGraph;
