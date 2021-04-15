import React from "react"
import LoginForm from "../views/Login/LoginForm";
import {Box} from "@material-ui/core";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";
import { useCookies } from 'react-cookie';

const useStyle = makeStyles({
    root:{
        paddingTop: 100,
        backgroundImage: "url('http://localhost/Cinema/Public/Imgs/login.jpeg')",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }
});

const Login = (props)=>{
    const classes = useStyle();
    const [cookies, setCookie] = useCookies(['name']);



    const redirect = ()=>{
        props.history.push("/admin/dashboard");
    }

    React.useEffect(
        ()=>{
            if(cookies["admin-login"]==="admin"){
                props.history.push("/admin/dashboard");
            }
        }
    )

    return(
        <Box className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}/>
                <GridItem xs={12} sm={12} md={4}>
                    <LoginForm redirect={redirect}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}/>
            </GridContainer>
        </Box>
    )
}

export default Login;