import React from 'react'
import { Button as MuiButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    root:{
        marginRight:theme.spacing(1)

    },
    label:{
        textTransform:'none'
    }
}))

export default function Button(props) {
    const {variant,size,color,text,onClick,...other}=props
    const classes = useStyles()
    return (
        <MuiButton
        classes={{root:classes.root,label:classes.label}}
        variant={variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onClick={onClick}
        {...other}
        >
        {text}    
        </MuiButton>
    )
}
