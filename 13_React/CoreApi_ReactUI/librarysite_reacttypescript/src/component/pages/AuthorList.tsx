import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Container } from "@material-ui/core";
import { Button } from "../control";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { AuthorHook } from "../../hooks";
import { AuthorService } from "../../utility/services";
import { IAuthor } from "../../interface";

interface Column {
  id: "authorName" | "doB" | "phone" | "email" | "edit" | "delete";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "authorName", label: "Author Name", minWidth: 100 },
  { id: "doB", label: "Date of Birth", minWidth: 100 },

  { id: "phone", label: "Phone", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "edit", label: "Edit", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export const AuthorList = () => {
  const { data: authors, setData: setUser } = AuthorHook(true);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("filter") || "");

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigateToAddAuthor = () => {
    navigate("/add-author");
  };

  const navigateToEditAuthor = (record: any) => {
    navigate(`/update-author/${record.authorId}`);
  };

  const deleteAuthor = async (record: any) => {
    try {
      const deleteAuthor = await AuthorService.delete(record.authorId);
      if (deleteAuthor.isActive) {
        const authorList = await AuthorService.getAll();
        setUser(authorList);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const filteredData = useMemo(() => {
    return authors.filter((x) => !search || x.authorName.includes(search));
  }, [authors, search]);

  return (
    <>
      <Container>
        <h1>Author</h1>
        <Button
          text="Add Author"
          color="primary"
          size="small"
          variant="contained"
          onClick={navigateToAddAuthor}
        />
        <div>&nbsp;</div>

        <TextField
          id="search"
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <div>&nbsp;</div>

        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((record: IAuthor) => {
                    return (
                      <TableRow key={record.authorId}>
                        <TableCell>{record.authorName}</TableCell>
                        <TableCell>{String(record.isActive)}</TableCell>
                        <TableCell>
                          <Button
                            text="Edit"
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={() => {
                              navigateToEditAuthor(record);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            text="Delete"
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?",
                                )
                              )
                                deleteAuthor(record);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={authors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
};
