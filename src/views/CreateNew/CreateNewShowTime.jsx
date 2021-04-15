import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import axios from "axios";
import Table from "../../components/Table/Table";
import {FormControl, InputLabel, Select} from "@material-ui/core";


const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    select:{
        margin: "27px 0 0 0",
        position: "relative",
        paddingBottom: 10,
        verticalAlign: "unset",
        width: "100%",
        "& .MuiFormLabel-root":{
            color: "#AAA",
            fontSize: 14,
        },
        "& .MuiFormLabel-root.Mui-focused":{
            color: "#AAA"
        },
        "& .MuiInput-underline:hover:before":{
            borderBottom: "1px solid rgba(0, 0, 0, 0.42) !important"
        },
        "& .MuiInput-underline:before":{
            borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
        },
        "& .MuiInput-underline:after":{
            borderBottom: "2px solid #9c27b0"
        }
    },
};

const useStyles = makeStyles(styles);

const CreateNewCinema = ()=>{
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("danger");
    const [status, setStatus] = React.useState("");
    const [data , setData] = React.useState({

    });
    const [table, setTable] = React.useState({
        Title: "",
        header: [],
        Content: [],
    });

    // Create New function


    // Get Datas from Database


    console.log(data, "cinemas");


    // Show Datas To Table


    // Life Cycle Hooks
    React.useEffect(
        ()=>{
        },[]
    );
    if(open===true){
        setTimeout(function() {
            setOpen(false);
        }, 6000);
    }

    // Handle Function

    return (
        <div>
            <Snackbar
                place="bl"
                message={status}
                open={open}
                closeNotification={() => setOpen(false)}
                close
                color={color}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>

                    {/*Create New Province*/}
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Create New Province</h4>
                            {/*<p className={classes.cardCategoryWhite}>Complete your profile</p>*/}
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <CustomInput
                                        labelText="Province Name"
                                        id="province"
                                        inputProps={{
                                            // onChange: handleProvinceName,
                                            name: "username",
                                            type: "text",
                                            defaultValue: data.province_name,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary"
                                    // onClick={fetchDataCreateProvince}
                                >
                                Create New</Button>
                            <Button color="primary"
                                    // onClick={showProvinces}
                            >
                                See Current Province</Button>
                        </CardFooter>
                    </Card>

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{table.Title}</h4>
                        </CardHeader>
                        <CardBody profile>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={table.header}
                                tableData={table.Content}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default CreateNewCinema;
