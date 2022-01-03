import React ,{useState} from "react";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import EmployeeForm from "./EmployeeForm";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from '@material-ui/core'
import useTable from "../../components/useTable";
import * as employeeService from '../../services/EmployeeService'
import { Controls } from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from "../../components/Notification";
import ConfirmDialog from '../../components/ConfirmDialog'

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
      width:'75%'
    },
    newButton:{
      position: 'absolute',
      right:'10px'
    }
}))

const headCells = [
  {id:'fullName',label:'Employee Name'},
  {id:'email',label:'Email Address (personal)'},
  {id:'mobile',label:'Mobile Number'},
  {id:'department',label:'Department'},
  {id:'actions',label:'Actions',disableSorting:true}
]




function Employees() {

    const classes = useStyles()
    const [recordForEdit,setRecordForEdit] = useState(null)
    const [records,setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn,setFilterFn] = useState({fn : items => {return items}})
    const [openPopup,setOpenPopup] = useState(false)
    const [notify,setNotify] = useState({isOpen:false,message:'',type:''})
    const [confirmDialog,setConfirmDialog] = useState({
      isOpen:false,
      title:'',
      subtitle:''

    })

    const {TblContainer,TblHead,TblPagination,recordsAfterPagingAndSorting} = useTable(records,headCells,filterFn)

    const handleSearch = (e)=>{
      let target = e.target

      setFilterFn({
        fn: items => {
          if(target.value === ''){
            return items
          }else{
            return items.filter(x => x.fullName.includes(target.value))
          }
        }
      })
    }

    const addOrEdit = (employee,resetForm) =>{
      if(employee.id === '0'){
        employeeService.insertEmployee(employee)
      }else{
        employeeService.updateEmployee(employee)
      }
      resetForm()
      setOpenPopup(false)
      setRecords(employeeService.getAllEmployees())
      setNotify({
        isOpen:true,
        message:'submitted successfully',
        type:'success'
      })
    }


    const openInPopup = (item) =>{
      setRecordForEdit(item)
      setOpenPopup(true)

    }

    const onDelete=(id)=>{
      setConfirmDialog({
        ...confirmDialog,
        isOpen:false
      })
        
        employeeService.deleteEmployee(id)
        setRecords(employeeService.getAllEmployees())
        setNotify({
          isOpen:true,
          message:'submitted successfully',
          type:'error'
        })

    }


  return (
    <>
      <PageHeader
        title='New Employee'
        subtitle='Form design with validation'
        icon={<PeopleOutlineIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
      
      <Toolbar>
        <Controls.Input
          label='Search'
          className={classes.searchInput}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><Search/></InputAdornment>)
          }}
        />
        <Controls.Button
          className={classes.newButton}
          text='Add New'
          variant='outlined'
          startIcon={<AddIcon/>}
          onClick={()=>{
            setOpenPopup(true)
            setRecordForEdit(null)
          }}
        />
      </Toolbar>
      <TblContainer>
        <TblHead/>
        <TableBody>
          {
            recordsAfterPagingAndSorting().map((item,index) =>{
              return <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton 
                  onClick={()=>{openInPopup(item)}}
                  color='primary'>
                    <EditOutlinedIcon fontSize='small' />
                  </Controls.ActionButton>
                  <Controls.ActionButton 
                  onClick={()=>{
                    setConfirmDialog({
                      isOpen:true,
                      title:'Are you sure to delete this record',
                      subtitle:'You can not undo this operation',
                      onConfirm:()=>onDelete(item.id)
                    })
                  }}
                  color='secondary'>
                    <CloseIcon fontSize='small'/>
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            })
          }

        </TableBody>
      </TblContainer>
      <TblPagination/>
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title='New Employee'
      >
        <EmployeeForm 
        recordForEdit={recordForEdit}
        addOrEdit={addOrEdit}
        />
      </Popup>
      <Notification 
      notify={notify}
      setNotify={setNotify}
      />
      <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default Employees;
