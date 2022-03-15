import "./barchart.css";
import React, {useState, useEffect} from "react";
import { endOfWeek, setISOWeek, startOfWeek, getISOWeek } from "date-fns";
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


function weekNumber(week){
  todaysDate = new Date()
  if((getISOWeek(new Date(), {weekStartsOn: 0, locale: "da-DK"})-week)< 1){
    todaysDate.setFullYear( todaysDate.getFullYear()-1)
    return 52 + (getISOWeek(new Date(), {weekStartsOn: 0, locale: "da-DK"})-week)
  } else {
    todaysDate.setFullYear( todaysDate.getFullYear())
    return getISOWeek(new Date(), {weekStartsOn: 0, locale: "da-DK"})-week
  }
}



const data = [
  {
    name: `Week ${weekNumber(7)}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Week ${weekNumber(6)}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Week ${weekNumber(5)}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Week ${weekNumber(4)}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Week ${weekNumber(3)}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Week ${weekNumber(2)}`,
    Floship: 50,
    Link: 50,
  },
  {
    name: `Week ${weekNumber(1)}`,
    Floship: 50,
    Link: 50,
  }
];

async function getWeekData(startDate, endDate){
  const weekData = await getDataFiltered(endDate, startDate)
  if(weekData && weekData.data && weekData.data.length > 1){
    let total = 0
    let weekDataFloship = 0
    let weekDataLink = 0
    total = weekData.data[0].value + weekData.data[1].value
    weekDataFloship = weekData.data[0].value / total
    weekDataLink = weekData.data[1].value / total
    return [Math.round((weekDataFloship)*100), Math.round((weekDataLink)*100)]
  }
  else{
    return [0,0]
  }
}

function weeks(number){
  const week = weekNumber(number)
  return [startOfWeek(setISOWeek(todaysDate, week),{weekStartsOn:1}), endOfWeek(setISOWeek(todaysDate, week),{weekStartsOn:1})]
}


const all7WeeksFromNow=[weeks(7), weeks(6), weeks(5), weeks(4), weeks(3), weeks(2), weeks(1)]
const getAllWeeksData = all7WeeksFromNow.map((week)=>{return getWeekData(week[0], week[1])})


export default function NgBarChart() {

  const [weekData, setWeekData] = useState(data)

 useEffect(() => {
    Promise.all(getAllWeeksData).then((values)=>{
      setWeekData(
        [
        {
          name: `Week ${weekNumber(7)}`,
          Floship: values[0][0],
          Link: values[0][1],
        },
        {
          name: `Week ${weekNumber(6)}`,
          Floship: values[1][0],
          Link: values[1][1],
        },
        {
          name: `Week ${weekNumber(5)}`,
          Floship: values[2][0],
          Link: values[2][1],
        },
        {
          name: `Week ${weekNumber(4)}`,
          Floship: values[3][0],
          Link: values[3][1],
        },
        {
          name: `Week ${weekNumber(3)}`,
          Floship: values[4][0],
          Link: values[4][1],
        },
        {
          name: `Week ${weekNumber(2)}`,
          Floship: values[5][0],
          Link: values[5][1],
        },
        {
          name: `Week ${weekNumber(1)}`,
          Floship: values[6][0],
          Link: values[6][1],
        }
        ]
      )
    })
  }, []); 

  return (
    <div className="barChart">
      <div>
        <h2>Weekly - Floship vs Link</h2>
      </div>
      <div>
        <BarChart
          width={900}
          height={400}
          data={weekData}
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
