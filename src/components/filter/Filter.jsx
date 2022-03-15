import React, {useState, useEffect} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './filter.css'
import { getAllCountries, getAllStatus, getAllCenter, getAllStores, getTagsFiltered } from '../../Modules/api-functions';
import ReactCountryFlag from "react-country-flag"

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

export default function MultipleSelectCheckmarks({setCountryFilter, setTagsFilter, setStatusFilter, setCenterFilter, setStoreFilter}) {
  const [countryList, setCountryList] = useState([]);
  const [countryOptions, setCountryOptions] = useState([])

  const [tagsList, setTagsList] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([])

  const [statusList, setStatusList] = useState([]);
  const [statusOptions, setStatusOptions] = useState([])

  const [centerList, setCenterList] = useState([]);
  const [centerOptions, setCenterOptions] = useState([])

  const [storeList, setStoreList] = useState([]);
  const [storeOptions, setStoreOptions] = useState([])

  useEffect(() => {
    getAllCountries().then((data)=>{
      data.data.forEach(element => {
       setCountryOptions(oldArray=>[...oldArray, element.group])
      });
    })
    getTagsFiltered(null).then((data)=>{
      data.data.forEach((tag)=>{
      setTagsOptions(oldArray=>[...oldArray, tag.group])
    })})
    getAllStatus().then((data)=>{
      data.data.forEach(element => {
       setStatusOptions(oldArray=>[...oldArray, element.group])
      });
    })
    getAllCenter().then((data)=>{
      data.data.forEach(element => {
       setCenterOptions(oldArray=>[...oldArray, element.group])
      });
    })
    getAllStores().then((data)=>{
      data.data.forEach(element => {
       setStoreOptions(oldArray=>[...oldArray, element.group])
      });
    })
  }, []);
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountryFilter(value.length > 0 ? {
      "shipping_address.country_code": {
        "$in": value
      }
    }
    : 
    {
      "shipping_address.country_code": {
        "$nin": []
      }
    } 
    )
    setCountryList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatusFilter(value.length > 0 ? {
      "tags": {
        "$in": value
      }
    }
    : 
    {
      "tags": {
        "$nin": []
      }
    } 
    )
    setTagsList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagsFilter(value.length > 0 ? {
      "financial_status": {
        "$in": value
      }
    }
    : 
    {
      "financial_status": {
        "$nin": []
      }
    } 
    )
    setStatusList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleCenterChange = (event) => {
    const {
      target: { value },
    } = event;
    setCenterFilter(value.length > 0 ? {
      "center": {
        "$in": value
      }
    }
    : 
    {
      "center": {
        "$nin": []
      }
    } 
    )
    setCenterList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStoreChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagsOptions([])
      getTagsFiltered(value).then((data)=>{
      data.data.forEach((tag)=>{
      setTagsOptions(oldArray=>[...oldArray, tag.group])
    })})
    
    setStoreFilter(value.length > 0 ? {
      "store": {
        "$in": value
      }
    }
    : 
    {
      "store": {
        "$nin": []
      }
    } 
    )
    setStoreList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="filterBar">
      <FormControl sx={{ m: 1.5, width: 230 }}>
        <InputLabel id="demo-multiple-checkbox-label">Market</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={countryList}
          onChange={handleChange}
          input={<OutlinedInput label="Market" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {countryOptions.map((country, index) => (
            <MenuItem key={index} value={country}>
              <Checkbox checked={countryList.indexOf(country) > -1} />
              <ListItemText primary={country} />
              <ReactCountryFlag countryCode={country} svg/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    
  
      <FormControl sx={{ m: 1.5, width: 230 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tagsList}
          onChange={handleTagsChange}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tagsOptions.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={tagsList.indexOf(name) > -1} />
              <ListItemText primary={name}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      
      <FormControl sx={{ m: 1.5, width: 230 }}>
        <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={statusList}
          onChange={handleStatusChange}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {statusOptions.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={statusList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> 

      <FormControl sx={{ m: 1.5, width: 230 }}>
        <InputLabel id="demo-multiple-checkbox-label">Center</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={centerList}
          onChange={handleCenterChange}
          input={<OutlinedInput label="Center" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {centerOptions.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={centerList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> 

      <FormControl sx={{ m: 1.5, width: 230 }}>
        <InputLabel id="demo-multiple-checkbox-label">Store(s)</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={storeList}
          onChange={handleStoreChange}
          input={<OutlinedInput label="Store(s)" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {storeOptions.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={storeList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
    </div>
  );
}