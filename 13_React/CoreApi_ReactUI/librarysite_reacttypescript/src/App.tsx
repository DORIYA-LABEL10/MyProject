import React from 'react';
import './App.css';
import {AuthorForm, AuthorList, BookForm, BookList, CategoryForm, CategoryList, PublisherForm, PublisherList} from '../src/component/pages';
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {NavBar} from './component/layout';

const theme = createTheme({
  palette: {
    primary: { main: "#333996", light: '#3c44b126' },
    secondary: { main: "#f83245", light: '#f8324526' },
    background: { default: "#f4f5fd" },
  },
  overrides: { MuiAppBar: { root: { transform: 'translateZ(0)' } } },
  props: { MuiIconButton: { disableRipple: true } }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '100%'
  }
})



function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
       <Router>
          <NavBar />
            <div className={classes.appMain}>
                <Routes>
           {/* category routes */}
          <Route path="/" element={<CategoryList/>} />
          <Route path="/add-category" element={<CategoryForm/>} />
          <Route path="/update-category/:id" element={<CategoryForm/>} />

                  {/* Author routes */}
          <Route path="/author-list" element={<AuthorList/>} />
          <Route path="/add-author" element={<AuthorForm/>} />
          <Route path="/update-author/:id" element={<AuthorForm/>} />

                  {/* Publisher routes */}
          <Route path="/publisher-list" element={<PublisherList/>} />
          <Route path="/add-publisher" element={<PublisherForm/>} />
          <Route path="/update-publisher/:id" element={<PublisherForm/>} />

                  {/* Book  routes */}
          <Route path="/book-list" element={<BookList/>} />
          <Route path="/add-book" element={<BookForm/>} />
          <Route path="/update-book/:id" element={<BookForm/>} />

       
                </Routes>
           </div>
          <CssBaseline />
       </Router>
    </ThemeProvider>
  );
}

export default App;
