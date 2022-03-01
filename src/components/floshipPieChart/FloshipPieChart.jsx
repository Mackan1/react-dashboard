import "./floshipPieChart.css";
import { PieChart, Pie, Cell } from "recharts";
import axios from 'axios';
import React, {useState} from 'react' 






function FloshipPieChart() {

  const [floship, setFloship] = useState(0);
  const [link, setLink] = useState(0);

  const getFloshipData = async () => {
  await axios.get('http://localhost:4000/onlyFloship')
      .then((res) => {
        let orderData = res.data
        setFloship(orderData.length)
    })
  }
  const getLinkData = async () => {
  await axios.get('http://localhost:4000/notFloship')
      .then((res) => {
        let orderData = res.data
        setLink(orderData.length)
    })
  }

  getFloshipData()
  getLinkData()

  const data = [
    { name: "Floship", value: floship},
    { name: "Link", value: link },
  ];

  
  const COLORS = ["#1d2150", "#c2003a"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }: any) => {
      // eslint-disable-next-line
      const radius = 35 + innerRadius + (outerRadius - innerRadius);
      // eslint-disable-next-line
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      // eslint-disable-next-line
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(1)}% - ${data[index].name}`}
        </text>
      );
    };
  

  return (
    <div className="floshipPieChart">
      <div className="pieChartTitle">
        <h3>Floship vs Other</h3>
      </div>
      <PieChart width={450} height={350}>
        <Pie
          data={data}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default FloshipPieChart;
