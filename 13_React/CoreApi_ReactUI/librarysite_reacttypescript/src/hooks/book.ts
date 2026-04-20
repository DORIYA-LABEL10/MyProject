import {IBook} from '../interface';
import {useEffect,useState} from 'react';
import {BookService} from '../utility/services';

export const BookHook=(loadingBook:boolean)=>{
    const [data,setData]=useState<IBook[]>([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const result=await BookService.getAll();
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
        if(loadingBook){
            fetchData();
        }
    },[loadingBook])
    
    return {data,loading,error,setData}
}