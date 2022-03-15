import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import './countryTable.css'
import { ExportJsonCsv } from 'react-export-json-csv';

const headers = [
  {
    key: 'group',
    name: 'Country',
  },
  {
    key: 'group_series_0',
    name: 'Fulfillment Center',
  },
  {
    key: 'value',
    name: 'Orders'
  }
]

const CountryTable = ({filter, chartId, height, width}) => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-react-dashboard-itdsk'});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: height, width: width, theme: "light", filter: filter}));
  const [skuData, setSkuData] = useState()
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);
  
  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  useEffect(() => {
    if (rendered && getData) {
      chart.getData().then((data)=>{
        setSkuData(data.documents)
      })
    } 
  }, [getData]);
  
  return (
    <div className="countryTableBox">
        <div className="chart" ref={chartDiv}/>
        <p onClick={()=>setGetData(true)} className="download">Press here to export the data</p>
        {getData === true && (
        <ExportJsonCsv headers={headers} items={skuData} fileTitle="country-floship.csv">Download data as a csv file</ExportJsonCsv> 
        )}
    </div>
  );
};

export default CountryTable;