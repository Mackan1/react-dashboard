import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import './ruralUrbanPieChart.css'

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
    <div className="ruralUrbanPieChart">
        <div className="chart" ref={chartDiv}/>
    </div>
  );
};

export default FloshipPieChart;