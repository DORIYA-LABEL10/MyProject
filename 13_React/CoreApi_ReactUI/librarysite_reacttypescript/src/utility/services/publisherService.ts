import {  IPublisher} from '../../interface';
import {BaseService} from '../services';


export class PublisherService {

static getAll=async():Promise<IPublisher[]>=>{
        const result=await BaseService.createInstance().get('Publisher/GetPublishers')
        return result.data;
    }

    static getById=async(publisherId:number):Promise<IPublisher>=>{
        const result=await BaseService.createInstance().get('Publisher/GetPublisher/' + publisherId)
        return result.data;
    }

    static add=async(publisher:IPublisher):Promise<IPublisher>=>{
        const result=await BaseService.createInstance().post('Publisher/InsertPublisher',publisher)
        return result.data;
    }

    static update=async(publisher:IPublisher):Promise<IPublisher>=>{
        const result=await BaseService.createInstance().put(`Publisher/UpdatePublisher/` +publisher.publisherId,publisher)
        return result.data;
    }

    static delete=async(publisherId:number):Promise<IPublisher  >=>{
        const result=await BaseService.createInstance().delete('Publisher/DeletePublisher/' + publisherId)
        return result.data;
    }     
}