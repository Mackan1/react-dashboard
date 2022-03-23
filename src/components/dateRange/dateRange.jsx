import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, { useState } from 'react'
import { subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import './dateRange.css'

function DateRange ({setDateRange}){

    const [date, setDate] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    return (
    <div className="dateRangeBox">
      <div className="dateRangeTitle">
        <h3>Date range</h3>
      </div>
        <DateRangePicker
            onChange={(item) => {
                setDate([item.selection])
                if (item.selection.startDate.toString() !== item.selection.endDate.toString()){
                    setDateRange({
                      created_at: {
                          $gte: item.selection.startDate.toISOString(), 
                          $lt: item.selection.endDate.toISOString()
                      }
                    })
                }
            }}
            editableDateInputs={true}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            weekStartsOn={1}
            minDate= {new Date("January 1, 2021 00:00:00")}
            maxDate= {new Date()}
            ranges={date}
            direction="vertical"
            calendarFocus='backwards'
            scroll={{ enabled: true }}
            preventSnapRefocus={true}
        />
    </div>
  );
} 

export default DateRange;