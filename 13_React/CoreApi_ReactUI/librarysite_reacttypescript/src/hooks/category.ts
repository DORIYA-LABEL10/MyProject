import {ICategory} from '../interface';
import {useEffect,useState} from 'react';
import {CategoryService} from '../utility/services';

export const CategoryHook=(loadingCategory:boolean)=>{
    const [data,setData]=useState<ICategory[]>([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const result=await CategoryService.getAll();
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
        if(loadingCategory){
            fetchData();
        }
    },[])
    
    return {data,loading,error,setData}
}