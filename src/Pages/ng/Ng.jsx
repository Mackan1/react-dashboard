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
import SavedFilter from "../../components/savedFilter/SavedFilter";
import RuralUrbanPieChart from "../../components/ruralUrbanPieChart/RuralUrbanPieChart";

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
  const [fulfillmentStatusFilter, setFulfillmentStatusFilter] = useState()

  function setAllFilters(passedSavedFilter){
    if(passedSavedFilter === null || passedSavedFilter === undefined || passedSavedFilter === ""){
      setCountryFilter(undefined)
      setTagsFilter(undefined)
      setStatusFilter(undefined)
      setCenterFilter(undefined)
      setStoreFilter(undefined)
      setFulfillmentStatusFilter(undefined)
    }else{
      let savedFilter = JSON.parse(passedSavedFilter)
      if ('shipping_address.country_code' in savedFilter){
        setCountryFilter({
        'shipping_address.country_code': savedFilter["shipping_address.country_code"]
        })
      } else {
        setCountryFilter(undefined)
      }
      if ('$and' in savedFilter){
        setTagsFilter({
          '$and': savedFilter.$and.map((value)=>{
            return {tags: new RegExp(value.tags, "i")}
          })
        })
      } else {
         setTagsFilter(undefined)
      }
      if ('financial_status' in savedFilter){
        setStatusFilter({
          'financial_status': savedFilter.financial_status
        })
      } else {
        setStatusFilter(undefined)
      }
      if ('center' in savedFilter){
        setCenterFilter({
          'center': savedFilter.center
        })
      } else{
        setCenterFilter(undefined)
      }
      if ('store' in savedFilter){
        setStoreFilter({
          'store': savedFilter.store
        })
      }else{
        setStoreFilter(undefined)
      }
      if ('line_items.fulfillment_status' in savedFilter){
        setFulfillmentStatusFilter({
          'line_items.fulfillment_status': savedFilter['line_items.fulfillment_status']
        })
      }else{
        setFulfillmentStatusFilter(undefined)
      }
    }
  }

  return (
    <div className="ng">
      <Filter setCountryFilter={setCountryFilter} setTagsFilter={setTagsFilter} setStatusFilter={setStatusFilter} setCenterFilter={setCenterFilter} setStoreFilter={setStoreFilter} setFulfillmentStatusFilter={setFulfillmentStatusFilter}/>
      <div className="section">
         <div className="leftSide">
               <SavedFilter filter={{...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter, ...fulfillmentStatusFilter}} setAllFilters={setAllFilters}/>
              <DateRange setDateRange={setDateRange} sx={{width: "100%"}}/>
        </div>
        <div className="rightSide">
          <FloshipPieChart height={'550px'} width={'550px'} filter={{...dateRange,...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter, ...fulfillmentStatusFilter}} chartId={'6225d02d-f05b-4b7c-8ba1-75f099bafaa4'}/>
        </div>
      </div>
      <div className="section">
        <div className="sectionThreeLeftSide">
            <SkuTable height={'550px'} width={'600px'} filter={{...dateRange,...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter, ...fulfillmentStatusFilter}} chartId={'62227138-8aad-4087-87b5-9bd744f3baba'}/>
        </div>
        <div className="sectionThreeRightSide">
           <CountryTable height={'550px'} width={'600px'} filter={{...dateRange,...countryFilter,...tagsFilter,...statusFilter,...centerFilter,...storeFilter, ...fulfillmentStatusFilter}} chartId={'622745cb-5f2f-4efa-8196-4374b1db6c46'}/>
        </div>
      </div>
     <div className="section">
       <div className="sectionTwoLeftSide">
           <NgBarChart storeFilter={storeFilter} countryFilter={countryFilter}/>
           <MonthBarChart storeFilter={storeFilter} countryFilter={countryFilter}/>
       </div>
      <div className="sectionTwoRightSide">
        <RuralUrbanPieChart height={'450px'} width={'450px'} filter={{...dateRange}} chartId={'6239bd5e-4410-49ce-8735-ccc5fd9f325c'}/>
      </div>
     </div>
      </div>
  );
}

export default Ng;
