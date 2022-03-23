import {useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import './savedFilter.css'

export default function SavedFilter({filter, setAllFilters}) {
    const [saved, setSaved] = useState('');
    const [reload, reloadComponent] = useState(false)
    const [filterName, setFilterName] = useState("")


    const handleChange = (event) => {
        setSaved(event.target.value)
        if(event.target.value === ""){
            setAllFilters("")
        } else{
             setAllFilters(window.localStorage.getItem(event.target.value))
        }
    };

    const addName = (event) =>{
        setFilterName(event.target.value)
    }

    const deleteFilter = () => {
        window.localStorage.removeItem(saved)
        if (reload === false){
            reloadComponent(true)
        } else {
            reloadComponent(false)
        }
    }

    const savefilter = () => {
        if ('$and' in filter){
             let stringRegEx = filter.$and.map((tag)=>{
                 let exp = tag.tags
                 console.log({tags : exp.source})
                return {tags : exp.source}
             })
             
             filter["$and"] = stringRegEx
        }
        window.localStorage.setItem(filterName, JSON.stringify(filter))
        if (reload === false){
            reloadComponent(true)
        } else {
            reloadComponent(false)
        }
    };
    
  return (
      <div className='savedFilterBar'>
           <div className='saveBox'>
                <TextField label="Name your filter" variant="standard" sx={{width: "100%", margin: "10px"}} onChange={addName} />
                <Button variant="contained" endIcon={<SaveIcon />} onClick={savefilter} sx={{width: "100%", margin: "10px", fontSize: 12}}>Save current filter</Button>
           </div>
          <div className='savedFiltersList'>
            <FormControl sx={{width: "90%", display: "flex"}}>
                <InputLabel id="demo-simple-select-label">Your saved filters</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saved}
                label="Your saved filters"
                onChange={handleChange}
                sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                >
                    <MenuItem key={0} value="" onChange={handleChange}>
                        <em>None</em>
                    </MenuItem>
                    {Object.keys(localStorage).map((name, index) => (
                        <MenuItem divider={true} key={index + 1} value={name}  sx={{fontWeight: "300", fontSize: 14}}>
                            {name}
                            
                        </MenuItem>
                        
                    ))}
                </Select>
                  
            </FormControl>
            <IconButton sx={{backgroundColor: "#1976d2", width: "10%", borderRadius: 0 }} onClick={deleteFilter}>
                    <DeleteForeverIcon sx={{color: "white"}} />
            </IconButton> 
        </div>
      </div>
  );
}
