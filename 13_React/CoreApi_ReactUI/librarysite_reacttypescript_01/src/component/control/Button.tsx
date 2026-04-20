import React from "react";
import { Button as MuiButton } from "@material-ui/core";


interface IProps{
    variant:"text" | "outlined" | "contained"| undefined
    size:"small"|"large"|"medium"|undefined
    color:"inherit"|"primary"|"secondary"|"default"|undefined
    onclick?:any;
    text:string;
    [key:string]:any;
}


export const Button = (props: IProps) => {
    const {variant,size,color,onclick,text,...rest} = props;
    return (
       <MuiButton 
       variant={variant}
       size={size}
       color={color}
       onClick={onclick}
       {...rest}>
        {text}
       </MuiButton>
    )

}

