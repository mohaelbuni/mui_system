import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/useForm";
import { Controls } from "../../components/controls/Controls";
import * as employeeService from "../../services/EmployeeService";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  id: "0",
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

function EmployeeForm() {



    const { values, setValues,errors,setErrors,resetForm, handleInputChange } = useForm(initialFValues);

    console.log(values)

    const validate=()=>{
        let temp = {}
        temp.fullName= values.fullName ? '' : 'This field is required.'
        temp.email= (/$^|.+@.+..+/).test(values.email) ? '' : 'Email is not valid.'
        temp.mobile= values.mobile.length > 9 ? '' : 'Minimum 10 numbers required.'
        temp.fullName= values.fullName ? '' : 'This field is requird.'
        temp.departmentId= values.departmentId.length !== 0 ? '' : 'This field is required.'
        setErrors({ ...temp})
        
        return Object.values(temp).every(x => x === '')
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(validate())
            window.alert('testing ....')
    }


    return (
        <Form onSubmit={handleSubmit}>
        <Grid container >
            <Grid item xs={6}>
            <Controls.Input
                label='Full Name'
                name='fullName'
                value={values.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
            />
            <Controls.Input
                label='Email'
                name='email'
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
            />
            <Controls.Input
                label='Mobile'
                name='mobile'
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
            />
            <Controls.Input
                label='City'
                name='city'
                value={values.City}
                onChange={handleInputChange}
            />
            </Grid>
            <Grid item xs={6} >
            <Controls.RadioGroup
                name='gender'
                label='Gender'
                value={values.gender}
                onChange={handleInputChange}
                items={genderItems}
            />
            <Controls.Select
                name='departmentId'
                label='Department'
                value={values.departmentId}
                onChange={handleInputChange}
                options={employeeService.getDepartmentCollection()}
                error={errors.departmentId}
            />
            <Controls.DatePicker
                value={values.hireDate}
                name='hireDate'
                label='Hire Date'
                onChange={handleInputChange}
            />
            <Controls.Checkbox
                checked={values.isPermanent}
                name='isPermanent'
                label='Permanent Employee'
                onChange={handleInputChange}
            />
            <div>
            <Controls.Button
            type="submit"
            text='Submit'
            />
            <Controls.Button
            type="submit"
            text='Reset'
            color='default'
            onClick={resetForm}
            />
            </div>


            </Grid>
        </Grid>
        </Form>
    );
}

export default EmployeeForm;
