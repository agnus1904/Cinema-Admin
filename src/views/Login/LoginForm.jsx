import React from "react"
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";
import {makeStyles} from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import GridContainer from "../../components/Grid/GridContainer";
import Button from "../../components/CustomButtons/Button";
import {Box} from "@material-ui/core";
import Snackbar from "../../components/Snackbar/Snackbar";
import axios from "axios";
import { useCookies } from 'react-cookie';

const styles = {
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        textAlign: "center",
        fontSize: "1.6rem",
    }
};

const useStyles = makeStyles(styles);

const LoginForm = (props)=>{
    const classes = useStyles();
    const [cookies, setCookie] = useCookies(['name']);
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("danger");
    const [status, setStatus] = React.useState("");
    const [data, setData] = React.useState({
        user_name: "",
        password: "",
    });

    // Check Login
    const fetchDataCheckLogin = async()=>{
        let dataFetch = new FormData();
        dataFetch.append("user_name", data.user_name);
        dataFetch.append("password", data.password);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CheckLogin`, dataFetch
        );

        let res = await response.data;
        setStatus(res.message);
        res.error ?
            setCookie('admin-login', false , { path: '/' })
            : setCookie('admin-login', data.user_name, { path: '/' });
        res["error"]? setColor("danger") : setColor("success") ;
        setOpen(true);

        if(!res.error) {
            setTimeout(function () {
                props.redirect();
            }, 3000);
        }
    }

    if(open===true){
        setTimeout(function() {
            setOpen(false);
        }, 6000);
    }

    const handleUserName = e=>{
        const newData = {...data};
        newData.user_name = e.target.value;
        setData(newData);
    }

    const handlePassword = e=>{
        const newData = {...data};
        newData.password = e.target.value;
        setData(newData);
    }

    const handleEnter = e=>{
        if(e.key === "Enter"){
            fetchDataCheckLogin();
        }
    }

    return (
        <>
            <Snackbar
                place="bl"
                message={status}
                open={open}
                closeNotification={() => setOpen(false)}
                close
                color={color}
            />
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Log in</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>

                        {/*User Name*/}
                        <GridItem xs={"auto"} sm={"auto"} md={1}/>
                        <GridItem xs={12} sm={12} md={10}>
                            <CustomInput
                                labelText="User Name"
                                inputProps={{
                                    onChange: handleUserName,
                                    onKeyDown: handleEnter,
                                    value: data.user_name,
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={"auto"} sm={"auto"} md={1}/>

                        {/*Pass Word*/}
                        <GridItem xs={"auto"} sm={"auto"} md={1}/>
                        <GridItem xs={12} sm={12} md={10}>
                            <CustomInput
                                labelText="Password"
                                inputProps={{
                                    type: "password",
                                    onChange: handlePassword,
                                    onKeyDown: handleEnter,
                                    value: data.password,
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={"auto"} sm={"auto"} md={1}/>


                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Button color="primary"
                                onClick={fetchDataCheckLogin}
                        >Login</Button>
                    </Box>
                </CardFooter>
            </Card>
        </>
    )
}

export default LoginForm;