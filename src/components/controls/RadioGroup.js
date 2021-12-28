import React from 'react'
import {

    FormControl,
    FormControlLabel,
    RadioGroup as MuiRadioGroup,
    Radio,
    FormLabel
  } from "@material-ui/core";

export default function RadioGroup(props) {

    const {name,label,value,onChange,items}= props 

    return (

             <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup
              row
              name={name}
              
              value={value}
              onChange={onChange}
            >

            {items.map((item,index)=>{
                return <FormControlLabel
                key={'Radio'+index}
                value={item.id}
                control={<Radio color='primary'/>}
                label={item.title}
              />
            })}
            </MuiRadioGroup>
          </FormControl>

    )
}
