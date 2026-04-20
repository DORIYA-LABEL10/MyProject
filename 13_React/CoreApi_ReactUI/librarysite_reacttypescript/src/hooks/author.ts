import {IAuthor} from '../interface';
import {useEffect,useState} from 'react';
import {AuthorService} from '../utility/services';

export const AuthorHook=(loadingAuthor:boolean)=>{
    const [data,setData]=useState<IAuthor[]>([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const result=await AuthorService.getAll();
                setData([...result]);
            }
            catch(error:any){
                setData([]);
                setError(error.toString())
            }
            finally{
                setLoading(false);
            }
        }
        if(loadingAuthor){
            fetchData();
        }
    },[loadingAuthor])
    
    return {data,loading,error,setData}
}