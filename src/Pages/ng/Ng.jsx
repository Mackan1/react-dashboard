import FloshipPieChart from "../../components/floshipPieChart/FloshipPieChart";
import DateRange from "../../components/dateRange/dateRange";
import NgBarChart from "../../components/barChart/BarChart";
import MonthBarChart from "../../components/monthlyBarChart /MonthlyBarChart";
import SkuTable from "../../components/skuTable/SkuTable";
import CountryTable from "../../components/countryTable/countryTable";
import "./ng.css";
import Filter from "../../components/filter/Filter";
import subDays from "date-fns/subDays";
import { useState } from "react";

const defaultDate = {
    "startDate":subDays(new Date(), 7),
    "endDate": new Date()
} 


function Ng() {
  const [dateRange, setDateRange] = useState({
                "created_at": {
                    "$gte": defaultDate.startDate.toISOString(), 
                    "$lt": defaultDate.endDate.toISOString()
                }
              })
  const [countryFilter, setCountryFilter] = useState()
  const [tagsFilter, setTagsFilter] = useState()
  const [statusFilter, setStatusFilter] = useState()
  const [centerFilter, setCenterFilter] = useState()
  const [storeFilter, setStoreFilter] = useState()
  

  // useEffect(() => {
  //     setDateRange({
  //               "created_at": {
  //                   "$gte": defaultDate.startDate.toISOString(), 
  //                   "$lt": defaultDate.endDate.toISOString()
  //               }
  //             })
  // }, []);
 
  return (
    <div className="ng">
      <Filter setCountryFilter={setCountryFilter} setTagsFilter={setTagsFilter} setStatusFilter={setStatusFilter} setCenterFilter={setCenterFilter} setStoreFilter={setStoreFilter}/>
      <DateRange setDateRange={setDateRange}/>
      <FloshipPieChart height={'500px'} width={'600px'} filter={{...dateRange,...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter}} chartId={'6225d02d-f05b-4b7c-8ba1-75f099bafaa4'}/>
      <NgBarChart />
      <MonthBarChart />
      <SkuTable height={'550px'} width={'750px'} filter={{...dateRange,...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter}} chartId={'62227138-8aad-4087-87b5-9bd744f3baba'}/>
      <CountryTable height={'550px'} width={'750px'} filter={{...dateRange,...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter}} chartId={'622745cb-5f2f-4efa-8196-4374b1db6c46'}/>
    </div>
  );
}

export default Ng;
