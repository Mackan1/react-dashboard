import "./monthlyBarChart.css";
import React, {useState, useEffect} from "react";
import { endOfMonth, getMonth, subMonths, startOfMonth } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import { getDataFiltered } from "../../Modules/api-functions";

let todaysDate = new Date()
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const data = [

  {
    name: `Month ${getMonth(subMonths(todaysDate, 6))+1}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Month ${getMonth(subMonths(todaysDate, 5))+1}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Month ${getMonth(subMonths(todaysDate, 4))+1}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Month ${getMonth(subMonths(todaysDate, 3))+1}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Month ${getMonth(subMonths(todaysDate, 2))+1}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Month ${getMonth(subMonths(todaysDate, 1))+1}`,
    Floship: 50,
    Link: 50,
  }
];

const all6MonthsFromNow=[months(6), months(5), months(4), months(3), months(2), months(1)]

async function getMonthData(startDate, endDate, storeFilter, countryFilter){
  const monthData = await getDataFiltered(endDate, startDate, storeFilter, countryFilter)
  let total = 0
  let monthdataFloship = 0
  let monthdataLink = 0
  if(monthData && monthData.data && monthData.data.length > 1){
    total = monthData.data[0].value + monthData.data[1].value
    monthdataFloship = monthData.data[0].value / total
    monthdataLink = monthData.data[1].value / total
    return [Math.round((monthdataFloship)*100), Math.round((monthdataLink)*100)]
  }
  else{
    return [0,0]
  }
}

function months(number){
  const month = subMonths(todaysDate, number)
  return [startOfMonth(month), endOfMonth(month)]
}






export default function MonthBarChart(storeFilter, countryFilter) {
  const [monthData, setMonthData] = useState(data)
  const [allMonths, setAllMonths] = useState(null)

  useEffect(() => {
      setAllMonths(all6MonthsFromNow.map((month)=>{
        return getMonthData(month[0], month[1], storeFilter, countryFilter)
      }))    
  }, [storeFilter, countryFilter]);

 useEffect(() => {
   if (allMonths !== null){
    Promise.all(allMonths).then((values)=>{
        setMonthData(
          [
          {
            name: monthNames[getMonth(subMonths(todaysDate, 6))],
            Floship: values[0][0],
            Link: values[0][1],
          },
          {
            name: monthNames[getMonth(subMonths(todaysDate, 5))],
            Floship: values[1][0],
            Link: values[1][1],
          },
          {
            name: monthNames[getMonth(subMonths(todaysDate, 4))],
            Floship: values[2][0],
            Link: values[2][1],
          },
          {
            name: monthNames[getMonth(subMonths(todaysDate, 3))],
            Floship: values[3][0],
            Link: values[3][1],
          },
          {
            name: monthNames[getMonth(subMonths(todaysDate, 2))],
            Floship: values[4][0],
            Link: values[4][1],
          },
          {
            name: monthNames[getMonth(subMonths(todaysDate, 1))],
            Floship: values[5][0],
            Link: values[5][1],
          }
          ]
        )
      })
   }
  }, [allMonths]); 

  return (
    <div className="barChart">
      <em className="warningText">Beware: Only Store and Market filters work for this bar chart</em>
      <div>
        <h2>Monthly - Floship vs Link</h2>
      </div>
      <div>
        <BarChart
          width={750}
          height={350}
          data={monthData}
          margin={{
            top: 25,
            right: 30,
            left: 30,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis 
            domain={[0, 100]} 
            tickFormatter={(tick) => {
              return `${tick}%`;
            }}
            />
          <Tooltip 
          formatter={(tick) => {
                return `${tick}%`;
          }} 
          />
          <Bar dataKey="Floship" fill="#3d91ff">
            <LabelList 
              dataKey="Floship" 
              position="top" 
              formatter={(tick) => {
                return `${tick}%`;
              }} 
            />
          </Bar>
          <Bar dataKey="Link" fill="#1d2150" >
            <LabelList 
              dataKey="Link" 
              position="top" 
              formatter={(tick) => {
                return `${tick}%`;
              }} 
            />
          </Bar>
          <XAxis dataKey="name" />
          <Legend verticalAlign="top" height={40}/>
        </BarChart>
      </div>
      </div>  
  );
}
