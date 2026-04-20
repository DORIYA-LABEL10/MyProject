import { useState } from "react";

export const useForm = (initialState:any,validateOnChange:boolean, validate:any=null, initialStateError:any) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialStateError);

    const onChange = (e: any) => {
        const { name, value, Type,checked} = e.target;
        const parsaedValue = Type === "checkbox" ? checked 
        : Type === "number" ? parseFloat(value)
        :name === 'categoryid' || name === 'authorid' || name === 'publisherid' 
            ? parseInt(value)
            : value;

        setValues({  ...values,  [name]: parsaedValue }); 
        if (validateOnChange) validate({ [name]: parsaedValue });
      };
    
    const resetForm = () => {
        setValues(initialState);
        setErrors(initialStateError);
    };

    return {
        onChange,
        values,
        errors,
        setErrors,
        resetForm,
        setValues,
    };
}