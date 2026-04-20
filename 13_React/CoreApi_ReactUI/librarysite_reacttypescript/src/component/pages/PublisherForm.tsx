import React, {useEffect} from "react";
import {TextBox,Button,CheckBox} from '../control'
import {ICategory} from '../../interface'
import {useForm} from '../../hooks'
import { Grid, makeStyles} from "@material-ui/core";
import {CategoryService} from '../../utility/services';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


// defining the initial state for the form
const initialState:ICategory = {
    categoryId:0,
    categoryName: "",
    isActive:false
 };

 const useStyles=makeStyles({
    field:{
        marginTop:30,
        marginBottom:20,
        display:'block',
    }
 })

export const PublisherForm=()=>{

    // const { data: departments, loading, setData: setEmployee,error } = DepartmentHook(true);
    const classes=useStyles();
    const navigate = useNavigate();
    const {id} = useParams();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors }
        if ('categoryName' in fieldValues) {
            if (fieldValues.categoryName) {
                if (!(/^[a-zA-Z]+$/).test(fieldValues.categoryName)) {
                    temp.categoryName = "First Name should contain only alphabets not numbers or other special characters.";
                } else {
                    temp.categoryName = "";
                }
            } else {
                temp.categoryName = "This field is required.";
            }
        }        
       
        setErrors({
            ...temp
        })

        if (fieldValues === values) {
            if(temp.categoryName === ""){
                return true;
            }
        }
    }

   // getting the event handlers from our custom hook
    const { onChange, values,errors,setErrors,resetForm,setValues } = useForm(
        initialState,
        true,
        validate,
        initialState
    );

    // submit function
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(validate()){
            // if(id!=null && id!=undefined && parseInt(id)!=0){
                if(id!=null && id!==undefined && parseInt(id)!==0){
                updateCategory(values)  
                navigate("/")              
            }
            else{
                addCategory(values)
                navigate("/")
            }
        }
        else{
            console.log("Form Validation Error")
        }
    }

    const addCategory=async(values:ICategory)=>{
        try{
            const result=await CategoryService.add(values);
            if(result.isSuccess === true){
                navigate("/");
            }
        }
        catch(error:any){
            console.log(error);
        }        
    }

    const updateCategory=async(values:ICategory)=>{
        try{
            const result=await CategoryService.update(values);
            if(result.isSuccess === true){
                navigate("/");
            }
        }
        catch(error:any){
            console.log(error);
        }        
    }

    //reset form
    const resetFormDetails=()=>{
        resetForm()
   }
    

    const navigateToCategoryList=()=>{
        navigate("/");
    }

    useEffect(()=>{
        if(id!==null && id!==undefined && parseInt(id)!==0){
            const fetchSelectedCategory=async()=>{
                try{
                    const category= await CategoryService.getById(parseInt(id));
                    // debugger
                    setValues({
                        ...category
                    })
                }
                catch(error:any){
                }
            }
            fetchSelectedCategory();
        }
    },[id, setValues])

    return(
        <>
            <Grid container justify="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
            {id!=null && id!==undefined && parseInt(id)!==0?<h1>Edit Category</h1> : <h1>Add Category</h1>}
            <form onSubmit={handleSubmit}>
                <TextBox
                    id="categoryName"
                    name="categoryName"
                    type="text"
                    label="Category Name"
                    value={values.categoryName}
                    onChange={onChange}
                    error={errors.categoryName}  
                />                
                
                <CheckBox
                    name="isActive"
                    id="isActive"
                    label="Active Status"
                    value={values.isActive}
                    onChange={onChange}
                    className={classes.field}     
                />
                 
                <Button
                    type="Submit"
                    text="submit"
                    color="primary"
                    size="small"
                    variant="contained"
                />
                <Button
                    text="Reset"
                    color="default"
                    size="small"
                    variant="contained"
                    onClick={resetFormDetails}
                />
                  <Button
                    text="Cancel"
                    color="default"
                    size="small"
                    variant="contained"
                    onClick={navigateToCategoryList}
                  />
             </form>
            </Grid>
        </>
    )
}