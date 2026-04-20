import {IBook} from '../../interface';
import {BaseService} from '../services';


export class BookService {

      static getAll=async():Promise<IBook[]>=>{
        const result=await BaseService.createInstance().get('Book/GetBooks')
        return result.data;
    } 

    static getById=async(bookId:number):Promise<IBook>=>{
        const result=await BaseService.createInstance().get('Book/GetBook/' + bookId)
        return result.data;
    }

    static add=async(book:IBook):Promise<IBook>=>{
        const result=await BaseService.createInstance().post('Category/InsertCategory',book)
        return result.data;
    }

    static update=async(book:IBook):Promise<IBook>=>{
        const result=await BaseService.createInstance().put(`Book/UpdateBook/`+book.bookId,book)
        return result.data;
    }

    static delete=async(bookId:number):Promise<IBook>=>{
        const result=await BaseService.createInstance().delete('Book/DeleteBook/' + bookId)
        return result.data;
    }    
}