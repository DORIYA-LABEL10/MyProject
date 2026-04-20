import axios,{ AxiosInstance } from "axios";


export class BaseService {
    static baseUrl: string = 'http://localhost:5176/api';

   static createInstance(){
    let headers:any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    const client: AxiosInstance = axios.create({
        baseURL: BaseService.baseUrl,
        headers: {...headers}
    });
    return client;
   }

}