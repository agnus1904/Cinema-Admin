import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import {TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import axios from "axios";
import Table from "../../components/Table/Table";
import {Box, FormControl, InputLabel, Select, Typography} from "@material-ui/core";
import Danger from "../../components/Typography/Danger";
import Primary from "../../components/Typography/Primary";
import Muted from "../../components/Typography/Muted";


const styles = {
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    picker:{
        color: "rgba(0, 0, 0, 0.87)",
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

const CreateNewMovie = ()=>{
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("danger");
    const [status, setStatus] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [today, setToday] = React.useState(
        ()=>{
            let newToday = new Date();
            let dd =String(newToday.getDate()).padStart(2, '0');
            let mm =String(newToday.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy =newToday.getFullYear();

            newToday =yyyy + '-' + mm + '-' + dd;

            return (newToday);
        }
    );
    const [data , setData] = React.useState({
        actors:[],
        actor_name: "",
        actor_name_banner: "",
        actor_name_search: "",
        avatar: "",
        banner: "",
        date_of_birth: "",
        location: "",
        occupation: "",
        biography: "",
    });
    const [table, setTable] = React.useState({
        Title: "",
        header: [],
        Content: [],
    });

    // Create New function
    const fetchDataCreateNewActor = async ()=>{
        let dataFetch = new FormData();
        dataFetch.append("actor_name", data.actor_name);
        dataFetch.append("actor_name_banner", data.actor_name_banner);
        dataFetch.append("location", data.location);
        dataFetch.append("avatar", data.avatar);
        dataFetch.append("banner", data.banner);
        dataFetch.append("date_of_birth", data.date_of_birth);
        dataFetch.append("occupation", data.occupation);
        dataFetch.append("biography", data.biography);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewActor`, dataFetch
        );

        let res = await response.data;

        setStatus(res.message);
        setOpen(true);
        res.error? setColor("danger") : setColor("success") ;
    }


    // Get Data from Database
    const fetchDataStart = async ()=>{
        //Fetch movies
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetAllActor`
        );

        let res = await response.data;

        const newData = {...data};
        newData.actors = res.data;
        setData(newData);

        // Get today
        let today =new Date();
        let dd =String(today.getDate()).padStart(2, '0');
        let mm =String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy =today.getFullYear();

        today =yyyy + '-' + mm + '-' + dd;
        newData.release = today;
        setData(newData);
    }

    const fetchMoviesByName = async ()=>{
        let response;
        if(data.movie_name_search===""){
            response = await axios(
                `http://localhost/Cinema/PublicController/GetAllMovie`
            );
        }else{
            response = await axios(
                `http://localhost/Cinema/PublicController/GetAllMovieByName/${data.movie_name_search}`
            );
        }

        let res = await response.data;

        let newData = {...data};
        newData.movies = res.data;
        setData(newData);
        setPage(0);
    }

    console.log(data, "cinemas");

    // Show Data To Table
    const showActors = ()=>{
        let newArray = [];
        let newTable={...table};
        for(let actor of data.actors){
            newArray.push(Object.values(actor))
        }
        newTable.header = ["Actor Id", "Actor Name"];
        newTable.Title = "Current Actors";
        newTable.Content = newArray;
        setTable(newTable);
    }

    React.useEffect(
        ()=>{
            fetchDataStart();
        },[]
    );
    React.useEffect(
        ()=>{
            showActors();
        },[data.actors]
    );

    if(open===true){
        setTimeout(function() {
            setOpen(false);
        }, 6000);
    }

    // Handle Function
    const handleActorName = (e)=>{
        const newData = {...data};
        newData.actor_name= e.target.value;
        setData(newData);
    }

    const handleActorNameBanner = (e)=>{
        const newData = {...data};
        newData.actor_name_banner= e.target.value;
        setData(newData);
    }

    const handleLocation = (e)=>{
        const newData = {...data};
        newData.location= e.target.value;
        setData(newData);
    }

    const handleAvatar = (e)=>{
        const newData = {...data}
        newData.avatar = e.target.files[0];
        // = URL.createObjectURL(img);
        setData(newData);
    }
    const handleBanner = (e)=>{
        const newData = {...data}
        newData.banner = e.target.files[0];
        // = URL.createObjectURL(img);
        setData(newData);
    }

    const handleDateOfBirth = (value)=>{
        const newData = {...data};
        newData.date_of_birth = value;
        setData(newData);
    }

    const handleOccupation = (e)=>{
        const newData = {...data};
        newData.occupation= e.target.value;
        setData(newData);
    }

    const handleBiography = (e)=>{
        const newData = {...data};
        newData.biography= e.target.value;
        setData(newData);
    }

    const handleActorNameSearchEnter = e=>{
        if(e.key === "Enter"){
            fetchMoviesByName();
        }
    }

    const handleActorNameSearch = e=>{
        const newData = {...data};
        newData.actor_name_search =e.target.value;
        setData(newData);
    }

    const handleReset = ()=>{
        const newData ={...data};
        // newData.actors= [];
        newData.actor_name= "";
        newData.actor_name_banner= "";
        newData.avatar= "";
        newData.banner= "";
        // newData.date_of_birth= "";
        newData.location= "";
        newData.occupation= "";
        newData.biography= "";
        setData(newData);
    }

    const handlePageNext = ()=>{
        setPage(page+1);
    }

    const handlePagePrevious = ()=>{
        setPage(page-1);
    }

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
                    {/*Create New Room*/}
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Create New Actor</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>

                                {/*Actor Name*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Actor Name"
                                        inputProps={{
                                            onChange: handleActorName,
                                            value: data.actor_name,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Actor Name Banner*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Actor Name Banner"
                                        inputProps={{
                                            onChange: handleActorNameBanner,
                                            value: data.actor_name_banner,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Location*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Location"
                                        inputProps={{
                                            onChange: handleLocation,
                                            value: data.location,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Avatar*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={classes.select}>
                                        {
                                            !(data.avatar==="") ?
                                                (<Muted>
                                                    Avatar Movie
                                                </Muted>):
                                                (<Primary>
                                                    Avatar Movie
                                                </Primary>)

                                        }
                                        <Button
                                            variant="contained"
                                            component="label"
                                            color={data.avatar===""? "info" : "muted"}
                                        >
                                            {!(data.avatar==="")? "Done" : "Upload"}
                                            <input
                                                type="file"
                                                name="avatar"
                                                onChange={handleAvatar}
                                                hidden
                                            />
                                        </Button>
                                    </FormControl>
                                </GridItem>

                                {/*Avatar Banner*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={classes.select}>
                                        {
                                            !(data.banner==="")?
                                                (<Muted>
                                                    Banner Movie
                                                </Muted>):
                                                (<Primary>
                                                    Banner Movie
                                                </Primary>)
                                        }
                                        <Button
                                            variant="contained"
                                            component="label"
                                            color={data.banner===""? "info" : "muted"}
                                        >
                                            {!(data.banner==="")? "Done" : "Upload"}
                                            <input
                                                type="file"
                                                name="banner"
                                                onChange={handleBanner}
                                                hidden
                                            />
                                        </Button>
                                    </FormControl>
                                </GridItem>

                                {/*Date of Birth*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            className={classes.picker}
                                            format="yyyy/MM/dd"
                                            label="Date of Birth"
                                            maxDate={today}
                                            value={data.date_of_birth}
                                            onChange={handleDateOfBirth}
                                            animateYearScrolling
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>

                                {/*Occupation*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Occupation"
                                        inputProps={{
                                            onChange: handleOccupation,
                                            value: data.occupation,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Biography*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Biography"
                                        inputProps={{
                                            onChange: handleBiography,
                                            value: data.biography,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary"
                                    onClick={fetchDataCreateNewActor}
                            >Create New</Button>
                            <Button color="primary"
                                    onClick={handleReset}
                            >Reset</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{table.Title}</h4>
                        </CardHeader>
                        <CardBody profile>

                            {/*Search  Box*/}
                            <CustomInput
                                labelText="Actor Name"
                                inputProps={{
                                    onKeyDown: handleActorNameSearchEnter,
                                    onChange: handleActorNameSearch,
                                    defaultValue: data.cinema_name,
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />

                            <Button
                                color="info"
                                onClick={fetchMoviesByName}
                            >
                                Search
                            </Button>
                            {
                                table.Content.length === 0 ?
                                    (<></>) :
                                    (<>
                                        <Box display="flex" mt={5}>
                                            {
                                                table.Content.length === 0 ?
                                                    (<></>)  :
                                                    (<Danger >Page:{page+1}</Danger>)
                                            }
                                        </Box>
                                    </>)
                            }

                            {/*Table*/}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={table.header}
                                tableData={table.Content.slice(0+(page*5),5+(page*5))}
                            />

                            {/*Navigation*/}
                            <Box mt={3}>
                                {
                                    page<=0 ?
                                        (
                                            <Button
                                                disabled
                                            >Previous</Button>
                                        ) :
                                        (
                                            <Button
                                                color="info"
                                                onClick={handlePagePrevious}
                                            >Previous</Button>
                                        )
                                }
                                {
                                    page >= data.actors.length/5-1 ?
                                        (
                                            <Button
                                                disabled
                                            >Next</Button>
                                        ) :
                                        (
                                            <Button
                                                color="info"

                                                onClick={handlePageNext}
                                            >Next</Button>
                                        )
                                }
                            </Box>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default CreateNewMovie;
