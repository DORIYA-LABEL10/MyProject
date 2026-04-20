import React from "react";
import { makeStyles, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { text } from "stream/consumers";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#0cacf7",
    marginBottom: "20px",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    cursor: "pointer",
  },

  navButton: {
    color: "#252424",
    marginLeft: "10px",
    textTransform: "none",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#161515",
    }
  }
});

export const NavBar = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar position="static" className={classes.appBar}>     
         <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => navigate("/")}>
            Library Management System
          </Typography>
          <Button className={classes.navButton} onClick={() => navigate("/")}>Category</Button>
          <Button className={classes.navButton} onClick={() => navigate("/author-list")}> Author</Button>
          <Button className={classes.navButton} onClick={() => navigate("/publisher-list")}> Publisher</Button>
          <Button className={classes.navButton} onClick={() => navigate("/book-list")}> Book</Button>
        </Toolbar>
      </AppBar>
    );
};
