// import "./floshipPieChart.css";
// import { PieChart, Pie, Cell } from "recharts";
// import React, {useState} from 'react'

  
// function FloshipPieChart({selectedMode}) {

//   const [floship, setFloship] = useState(0);
//   const [link, setLink] = useState(0);

//   selectedMode.then((data)=>{
//         setFloship(data.data.floShipCount)
//         setLink(data.data.notFloshipCount)
//       })

//   const data = [
//     { name: "Floship", value: floship},
//     { name: "Link", value: link },
//   ];
  

//   const COLORS = ["#1d2150", "#3d91ff"];

//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({
//       cx,
//       cy,
//       midAngle,
//       innerRadius,
//       outerRadius,
//       percent,
//       index,
//     }: any) => {
//       // eslint-disable-next-line
//       const radius = 35 + innerRadius + (outerRadius - innerRadius);
//       // eslint-disable-next-line
//       const x = cx + radius * Math.cos(-midAngle * RADIAN);
//       // eslint-disable-next-line
//       const y = cy + radius * Math.sin(-midAngle * RADIAN);

//       return (
//         <text
//           x={x}
//           y={y}
//           fill="black"
//           textAnchor={x > cx ? "start" : "end"}
//           dominantBaseline="central"
//         >
//           {`${(percent * 100).toFixed(1)}% - ${data[index].name}`}
//         </text>
//       );
//     };
  

//   return (
//     <div className="floshipPieChart">
//       <div className="pieChartTitle">
//         <h2>Floship vs Link</h2>
//         <p>Showing data from selected date range</p>
//         <p>Floship: {floship} orders --- Link: {link} orders </p>
//       </div>
//       <PieChart width={550} height={450}>
//         <Pie
//           data={data}
//           labelLine={true}
//           label={renderCustomizedLabel}
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//     </div>
//   );
// }

// export default FloshipPieChart;


import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import './floshipPieChart.css'

const FloshipPieChart = ({filter, chartId, height, width}) => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-react-dashboard-itdsk'});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: height, width: width, theme: "light", filter: filter}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);
  
  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);
  
  return (
    <div className="floshipPieChart">
        <div className="chart" ref={chartDiv}/>
    </div>
  );
};

export default FloshipPieChart;