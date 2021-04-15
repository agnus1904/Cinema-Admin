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
import Quote from "../../components/Typography/Quote";
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
    const [data , setData] = React.useState({
        movies: [],
        movie_name: "",
        movie_name_banner: "",
        movie_name_search: "",
        description: "",
        avatar: "",
        banner: "",
        release: "",
        language: "",
        main_type: "",
        country: "",
        duration: "",
    });
    const [table, setTable] = React.useState({
        Title: "",
        header: [],
        Content: [],
    });

    // Create New function
    const fetchDataCreateNewMovie = async ()=>{
        let dataFetch = new FormData();
        dataFetch.append("movie_name", data.movie_name);
        dataFetch.append("movie_name_banner", data.movie_name_banner);
        dataFetch.append("language", data.language);
        dataFetch.append("avatar", data.avatar);
        dataFetch.append("banner", data.banner);
        dataFetch.append("release", data.release);
        dataFetch.append("duration", data.duration);
        dataFetch.append("main_type", data.main_type);
        dataFetch.append("country", data.country);
        dataFetch.append("description", data.description);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewMovie`, dataFetch
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
            `http://localhost/Cinema/PublicController/GetAllMovie`
        );

        let res = await response.data;

        const newData = {...data};
        newData.movies = res.data;
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
    const showMovies = ()=>{
        let newArray = [];
        let newTable={...table};
        for(let movie of data.movies){
            newArray.push(Object.values(movie))
        }
        newTable.header = ["Movie Id", "Movie Name"];
        newTable.Title = "Current Movies";
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
            showMovies();
        },[data.movies]
    );

    if(open===true){
        setTimeout(function() {
            setOpen(false);
        }, 6000);
    }

    // Handle Function
    const handleMovieName = (e)=>{
        const newData = {...data};
        newData.movie_name= e.target.value;
        setData(newData);
    }

    const handleMovieNameBanner = (e)=>{
        const newData = {...data};
        newData.movie_name_banner= e.target.value;
        setData(newData);
    }

    const handleLanguage = (e)=>{
        const newData = {...data};
        newData.language= e.target.value;
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

    const handleRelease = (value)=>{
        const newData = {...data};
        newData.release = value;
        setData(newData);
    }

    const handleMainType = (e)=>{
        const newData = {...data};
        newData.main_type= e.target.value;
        setData(newData);
    }

    const handleCountry = (e)=>{
        const newData = {...data};
        newData.country= e.target.value;
        setData(newData);
    }

    const handleDuration = (e)=>{
        const newData = {...data};
        newData.duration= e.target.value;
        setData(newData);
    }

    const handleMovieDescription = (e)=>{
        const newData = {...data};
        newData.description= e.target.value;
        setData(newData);
    }

    const handleMovieNameSearchEnter = e=>{
        if(e.key === "Enter"){
            fetchMoviesByName();
        }
    }

    const handleMovieNameSearch = (e)=>{
        const newData = {...data};
        newData.movie_name_search =e.target.value;
        setData(newData);
    }

    const handleReset = ()=>{
        const newData ={...data};
        // newData.movies= [];
        newData.movie_name= "";
        newData.movie_name_banner= "";
        newData.movie_name_search= "";
        newData.description= "";
        newData.avatar= "";
        newData.banner= "";
        // newData.release= "";
        newData.language= "";
        newData.main_type= "";
        newData.country= "";
        newData.duration= "";
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
                            <h4 className={classes.cardTitleWhite}>Create New Movie</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>

                                {/*Movie Name*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Movie Name"
                                        inputProps={{
                                            onChange: handleMovieName,
                                            value: data.movie_name,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Movie name banner*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Movie Name Banner"
                                        inputProps={{
                                            onChange: handleMovieNameBanner,
                                            value: data.movie_name_banner,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Language*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Language"
                                        inputProps={{
                                            onChange: handleLanguage,
                                            value: data.language,
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

                                {/*Release*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            className={classes.picker}
                                            format="yyyy/MM/dd"
                                            minDate="2021-04-02"
                                            label="Release Date"
                                            value={data.release}
                                            onChange={handleRelease}
                                            animateYearScrolling
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>

                                {/*Main Type*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Main Type"
                                        inputProps={{
                                            onChange: handleMainType,
                                            value: data.main_type,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Country*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Country"
                                        inputProps={{
                                            onChange: handleCountry,
                                            value: data.country,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Duration*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Duration"
                                        inputProps={{
                                            onChange: handleDuration,
                                            value: data.duration,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                {/*Description*/}
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Description"
                                        inputProps={{
                                            multiline: true,
                                            rows:3,
                                            onChange: handleMovieDescription,
                                            value: data.description,
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
                                    onClick={fetchDataCreateNewMovie}
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
                                labelText="Movie Name"
                                inputProps={{
                                    onKeyDown: handleMovieNameSearchEnter,
                                    onChange: handleMovieNameSearch,
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
                                    page >= data.movies.length/5-1 ?
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
