import React from "react";
import {
  Grid
} from "@material-ui/core";
import { useForm, Form } from "../../components/useForm";
import { Controls } from "../../components/controls/Controls";
import * as employeeService from "../../services/EmployeeService"

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
  const { values, setValues, handleInputChange } = useForm(initialFValues);

  return (
    <Form>
      <Grid container>
        <Grid item>
          <Controls.Input
            label='Full Name'
            name='fullName'
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
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
          
          />
        </Grid>

      </Grid>
    </Form>
  );
}

export default EmployeeForm;
