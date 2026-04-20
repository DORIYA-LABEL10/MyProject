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

import {CategoryHook} from '../../hooks';
import {CategoryService} from '../../utility/services/categoryService'
import {ICategory} from '../../interface'

interface Column {
    id: 'categoryName' | 'isActive' |'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'categoryName', label: 'Category Name', minWidth: 100 },
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

export const CategoryList=()=>{
    const { data:categories, setData: setUser } = CategoryHook(true);

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

    const navigateToAddCategory=()=>{
      navigate("/add-category");
    }
      
    const navigateToEditCategory=(record:any)=>{    
      navigate(`/update-category/${record.categoryId}`);
    }

    const deleteCategory=async(record:any)=>{
      try{
          const deleteCategory=await CategoryService.delete(record.categoryId);
          if(deleteCategory.isSuccess){
            const categoryList=await CategoryService.getAll();
            setUser(categoryList)            
          }         
      }
      catch(error:any){
        console.log(error)
      }
    }

    const filteredData=useMemo(()=>{
      return categories.filter(x=>!search || x.categoryName.includes(search))
    },[categories,search])

    return (
        <>
            <Container>
            <h1>Book Category</h1>
            <Button text="Add Category" color="primary" size="small" variant="contained" onClick={navigateToAddCategory} />
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
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record:ICategory) => {
                        return (
                        <TableRow key={record.categoryId}>
                           <TableCell>{record.categoryName}</TableCell>
                           <TableCell>{String(record.isActive)}</TableCell>
                           <TableCell>
                              <Button text="Edit" color="primary" size="small" variant="contained" onClick={()=>{navigateToEditCategory(record)}} />
                           </TableCell>
                           <TableCell>
                              <Button text="Delete" color="primary" size="small" variant="contained" onClick={()=>{if (window.confirm('Are you sure you wish to delete this item?')) deleteCategory(record)}}  />
                           </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={categories.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
          </Container>
        </>
    );
}

