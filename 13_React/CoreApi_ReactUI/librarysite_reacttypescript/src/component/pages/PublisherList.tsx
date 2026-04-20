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

import {PublisherHook } from '../../hooks/publisher';
import {PublisherService} from '../../utility/services';
import {IPublisher} from '../../interface'


interface Column {
    id: 'publisherName' | 'isActive' |'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'publisherName', label: 'Publisher Name', minWidth: 100 },
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

export const PublisherList=()=>{
    const { data:publishers, setData: setUser } = PublisherHook(true);

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

    const navigateToAddPublisher=()=>{
      navigate("/add-publisher");
    }
      
    const navigateToEditPublisher=(record:any)=>{    
      navigate(`/update-publisher/${record.publisherId}`);
    }

    const deletePublisher=async(record:any)=>{
      try{
          const deletePublisher=await PublisherService.delete(record.publisherId);
          if(deletePublisher.isActive){
            const publisherList=await PublisherService.getAll();
            setUser(publisherList)            
          }         
      }
      catch(error:any){
        console.log(error)
      }
    }

    const filteredData=useMemo(()=>{
      return publishers.filter(x=>!search || x.publisherName.includes(search))
    },[publishers,search])

    return (
        <>
            <Container>
            <h1>Publisher</h1>
            <Button text="Add Publisher" color="primary" size="small" variant="contained" onClick={navigateToAddPublisher} />
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
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record:IPublisher) => {
                        return (
                        <TableRow key={record.publisherId}>
                           <TableCell>{record.publisherName}</TableCell>
                           <TableCell>{String(record.isActive)}</TableCell>
                           <TableCell>
                              <Button text="Edit" color="primary" size="small" variant="contained" onClick={()=>{navigateToEditPublisher(record)}} />
                           </TableCell>
                           <TableCell>
                              <Button text="Delete" color="primary" size="small" variant="contained" onClick={()=>{if (window.confirm('Are you sure you wish to delete this item?')) deletePublisher(record)}}  />
                           </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={publishers.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
          </Container>
        </>
    );
}

