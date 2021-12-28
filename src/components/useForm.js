import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

        setValues({
          ...values,
          [name]: value,
        });
        console.log(value)
  };

  const resetForm = (e)=>{
      e.preventDefault()
      setValues(initialFValues)
      setErrors({})
  }

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const {children,...other} = props
  return <form className={classes.root} autoComplete="off" {...other}>{children}</form>;
}
