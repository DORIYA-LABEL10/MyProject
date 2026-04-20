import {IPublisher} from '../interface';
import {useEffect,useState} from 'react';
import {PublisherService} from '../utility/services';

export const PublisherHook=(loadingPublisher:boolean)=>{
    const [data,setData]=useState<IPublisher[]>([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true);
                const result=await PublisherService.getAll();
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
        if(loadingPublisher){
            fetchData();
        }
    },[loadingPublisher])
    
    return {data,loading,error,setData}
}