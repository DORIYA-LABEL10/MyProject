import React, {useEffect} from "react";
import {TextBox,Button,CheckBox} from '../control'
import { IAuthor} from '../../interface'
import {useForm} from '../../hooks'
import { Grid, makeStyles} from "@material-ui/core";
import {AuthorService} from '../../utility/services';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


// defining the initial state for the form
const initialState:IAuthor = {
    authorId: 0,
    authorName: "",
    doB: "",
    phone: "",
    email: "",
    isActive: false,
};

 const useStyles=makeStyles({
    field:{
        marginTop:30,
        marginBottom:20,
        display:'block',
    }
 })

export const AuthorForm=()=>{

    // const { data: departments, loading, setData: setEmployee,error } = DepartmentHook(true);
    const classes=useStyles();
    const navigate = useNavigate();
    const {id} = useParams();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors }
        if ('authorName' in fieldValues) {
            if (fieldValues.authorName) {
                if (!(/^[a-zA-Z]+$/).test(fieldValues.authorName)) {
                    temp.authorName = "First Name should contain only alphabets not numbers or other special characters.";
                } else {
                    temp.authorName = "";
                }
            } else {
                temp.authorName = "This field is required.";
            }
        }        
       
        setErrors({
            ...temp
        })

        if (fieldValues === values) {
            if(temp.authorName === ""){
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
                updateAuthor(values)  
                navigate("/")              
            }
            else{
                addAuthor(values)
                navigate("/")
            }
        }
        else{
            console.log("Form Validation Error")
        }
    }

    const addAuthor=async(values:IAuthor)=>{
        try{
            const result=await AuthorService.add(values);
            if(result.isActive === true){
                navigate("/");
            }
        }
        catch(error:any){
            console.log(error);
        }        
    }

    const updateAuthor=async(values:IAuthor )=>{
        try{
            const result=await AuthorService.update(values);
            if(result.isActive === true){
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
    

    const navigateToAuthorList=()=>{
        navigate("/");
    }

    useEffect(()=>{
        if(id!==null && id!==undefined && parseInt(id)!==0){
            const fetchSelectedAuthor=async()=>{
                try{
                    const author= await AuthorService.getById(parseInt(id));
                    // debugger
                    setValues({
                        ...author
                    })
                }
                catch(error:any){
                }
            }
            fetchSelectedAuthor();
        }
    },[id, setValues])

    return(
        <>
            <Grid container justify="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
            {id!=null && id!==undefined && parseInt(id)!==0?<h1>Edit Author</h1> : <h1>Add Author</h1>}
            <form onSubmit={handleSubmit}>
                <TextBox
                    id="authorName"
                    name="authorName"
                    type="text"
                    label="Author Name"
                    value={values.authorName}
                    onChange={onChange}
                    error={errors.authorName}  
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
                    onClick={navigateToAuthorList}
                  />
             </form>
            </Grid>
        </>
    )
}