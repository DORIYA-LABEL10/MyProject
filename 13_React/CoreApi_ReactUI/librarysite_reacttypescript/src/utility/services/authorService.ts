import {IAuthor, IResponse} from '../../interface';
import {BaseService} from '../services';




export class AuthorService {
static getAll=async():Promise<IAuthor[]>=>{
        const result=await BaseService.createInstance().get('Author/GetAuthors')
        return result.data;
    }

    static getById=async(authorId:number):Promise<IAuthor>=>{
        const result=await BaseService.createInstance().get('Author/GetAuthors/' + authorId)
        return result.data;
    }

    static add=async(author:IAuthor):Promise<IAuthor>=>{
        const result=await BaseService.createInstance().post('Author/InsertAuthor',author)
        return result.data;
    }

    static update=async(author:IAuthor):Promise<IAuthor>=>{
        const result=await BaseService.createInstance().put(`Author/UpdateAuthor/${author.authorId}`,author)
        return result.data;
    }

    static delete=async(authorId:number):Promise<IAuthor>=>{
        const result=await BaseService.createInstance().delete('Author/DeleteAuthor/' + authorId)
        return result.data;
    }  
}