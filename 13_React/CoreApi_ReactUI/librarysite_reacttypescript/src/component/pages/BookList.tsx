import React, { useState,useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Container } from "@material-ui/core";
import {Button} from '../control'
import { useNavigate,useSearchParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import {BookHook} from '../../hooks/book';
import {BookService} from '../../utility/services';
import {IBook} from '../../interface'

interface Column {
    id: 'bookName' | 'isActive' |'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'bookName', label: 'Book Name', minWidth: 100 },
    { id: 'isActive', label: 'IsActive?', minWidth: 100 },

    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },   
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export const BookList=()=>{
    const { data:books, setData: setUser } = BookHook(true);

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchParams]=useSearchParams();
    const [search,setSearch] = useState(searchParams.get('filter') || '');

    const navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigateToAddBook=()=>{
      navigate("/add-book");
    }
      
    const navigateToEditBook=(record:any)=>{    
      navigate(`/update-book/${record.bookId}`);
    }

    const deleteBook=async(record:any)=>{
      try{
          const deleteBook=await BookService.delete(record.bookId);
          if(deleteBook.isActive){
            const bookList=await BookService.getAll();
            setUser(bookList)            
          }         
      }
      catch(error:any){
        console.log(error)
      }
    }

    const filteredData=useMemo(()=>{
      return books.filter(x=>!search || x.bookName.includes(search))
    },[books,search])

    return (
        <>
            <Container>
            <h1>Book</h1>
            <Button text="Add Book" color="primary" size="small" variant="contained" onClick={navigateToAddBook} />
            <div>&nbsp;</div>

            <TextField id="search" label="Search" variant="outlined" value={search} onChange={(e)=>setSearch(e.target.value)} fullWidth />
             <div>&nbsp;</div>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} >
                              {column.label}
                          </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record:IBook) => {
                        return (
                        <TableRow key={record.bookId}>
                           <TableCell>{record.bookName}</TableCell>
                           <TableCell>{String(record.isActive)}</TableCell>
                           <TableCell>
                              <Button text="Edit" color="primary" size="small" variant="contained" onClick={()=>{navigateToEditBook(record)}} />
                           </TableCell>
                           <TableCell>
                              <Button text="Delete" color="primary" size="small" variant="contained" onClick={()=>{if (window.confirm('Are you sure you wish to delete this item?')) deleteBook(record)}}  />
                           </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={books.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
          </Container>
        </>
    );
}

