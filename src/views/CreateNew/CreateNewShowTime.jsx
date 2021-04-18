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
import {Box, FormControl, InputLabel, Select, useRadioGroup} from "@material-ui/core";
import Danger from "../../components/Typography/Danger";
import FirmItem from "../../components/FirmItem";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";

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
    picker:{
        color: "rgba(0, 0, 0, 0.87)",
        margin: "27px 0 0 0",
        position: "relative",
        paddingBottom: 10,
        verticalAlign: "unset",
        width: "100%",
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
    const [page, setPage] = React.useState(0);
    const [data , setData] = React.useState({
        province_id: "",
        provinces: [],
        cinema_id: "",
        cinemas: [],
        rooms_id: [],
        rooms: [],
        movies: [],
        movie_id: "",
        movie_name_search: "",
        show_time_date: "",
        show_time_date_check: "",
    });
    const [table, setTable] = React.useState({
        Title: "",
        header: [],
        Content: [],
    });

    const [groups, setGroups ] = React.useState({});

    // Create New function
    const CreateNewShowTime = async ()=>{
        if(data.rooms_id.length===0){
            console.log("no rooms id");
            let dataFetch = new FormData();
            dataFetch.append("province_id", data.province_id);
            dataFetch.append("cinema_id", data.cinema_id);
            dataFetch.append("room_id", "");
            dataFetch.append("movie_id", data.movie_id);
            dataFetch.append("show_time_date", data.show_time_date);
            let response = await axios.post(
                `http://localhost/Cinema/Admin/CreateNewShowTime`, dataFetch
            );
            let res = await response.data;

            setStatus(res.message);
            setOpen(true);
            res.error? setColor("danger") : setColor("success") ;

        }else{
            console.log("have rooms id");
            const rooms_id_error = [];
            for(let room_id of data.rooms_id){

                let dataFetch = new FormData();
                dataFetch.append("province_id", data.province_id);
                dataFetch.append("cinema_id", data.cinema_id);
                dataFetch.append("room_id", room_id);
                dataFetch.append("movie_id", data.movie_id);
                dataFetch.append("show_time_date", data.show_time_date);
                let response = await axios.post(
                    `http://localhost/Cinema/Admin/CheckNewShowTime`, dataFetch
                );
                const res = await response.data;

                if(res.Checked>0){
                    rooms_id_error.push(room_id);
                }
            }
            if(rooms_id_error.length===0){
                for(let room_id of data.rooms_id){

                    let dataFetch = new FormData();
                    dataFetch.append("province_id", data.province_id);
                    dataFetch.append("cinema_id", data.cinema_id);
                    dataFetch.append("room_id", room_id);
                    dataFetch.append("movie_id", data.movie_id);
                    dataFetch.append("show_time_date", data.show_time_date);
                    await axios.post(
                        `http://localhost/Cinema/Admin/CreateNewShowTime`, dataFetch
                    );

                }
                setStatus("Success");
                setOpen(true);
                setColor("success") ;
            }else{
                let statusError = rooms_id_error.map(
                    (room_id)=>{
                        return data.rooms.map(
                            (room)=>{
                                if(room.room_id===room_id){
                                    return room.room_name
                                }
                            }
                        ).filter(Boolean)[0]+" ";
                    }
                )

                setStatus(statusError+"cant create a new show time");
                setOpen(true);
                setColor("danger") ;
            }
        }

    }

    // Get Data from Database
    const fetchDataStart = async ()=>{

        const newData = {...data};

        //Fetch movies
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetAllMovie`
        );
        let res = await response.data;

        newData.movies = res.data;

        // Get Provinces
        let response2 = await axios(
            `http://localhost/Cinema/PublicController/GetProvince`
        );

        let res2 = await response2.data;
        newData.provinces = res2.data;

        let today = new Date();
        let dd =String(today.getDate()).padStart(2, '0');
        let mm =String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy =today.getFullYear();

        today =yyyy + '-' + mm + '-' + dd;
        newData.show_time_date = today;
        newData.show_time_date_check = today;

        setData(newData);
    }

    const fetchCinema = async (provinceId)=>{
        console.log("fetch cinema");
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetCinema/${provinceId}`
        );
        let res = await response.data;

        const newData = {...data};
        newData.province_id = provinceId;
        newData.cinemas = res.data;
        setData(newData);
    }

    const fetchRoom = async (cinemaId)=>{
        console.log("fetch room");
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetRoom/${cinemaId}`
        );
        let res = await response.data;

        const newData = {...data};
        newData.cinema_id = cinemaId;
        newData.rooms = res.data;
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

    const fetchShowTimeByRoom = async (room_id)=>{

        let response = await axios(
            `http://localhost/Cinema/PublicController/GetShowTimeByRoom/${room_id}/${data.movie_id}/${data.show_time_date_check}`
        );
        let res = await response.data;

        // Groups
        let newArray = [];
        for(let sub of res.data){
            let a = (Object.values(sub).slice(1));
            // a.unshift("");
            newArray.push(a);
        }
        let newGroups = {...groups};
        newGroups[room_id] = newArray;
        setGroups(newGroups)
    }


    console.log(data, "cinemas");
    console.log(groups, "Groups");



    // Show Data To Table
    const showMovies = ()=>{
        let newArray = [];
        let newTable={...table};
        for(let movie of data.movies){
            let ob = [...Object.values(movie)];
            ob.push(
                data.movie_id===ob[0] ?
                    (<Button
                        color="success"
                        onClick={()=>handleMovieClick(ob[0])}
                    >
                        picked
                    </Button>) :
                    (<Button
                        color="primary"
                        onClick={()=>handleMovieClick(ob[0])}
                    >
                        &nbsp;&nbsp;&nbsp;pick&nbsp;&nbsp;
                    </Button>)
            );
            newArray.push(ob);
        }
        newTable.header = ["Movie Id", "Movie Name","Choose"];
        newTable.Title = "Current Movies";
        newTable.Content = newArray;
        setTable(newTable);
    }

    // Life Cycle Hooks
    React.useEffect(
        ()=>{
            fetchDataStart();
        },[]
    );
    React.useEffect(
        ()=>{
            showMovies();
        },[data.movies, data.movie_id]
    );

    if(open===true){
        setTimeout(function() {
            if (open===true){
                setOpen(false);
            }
        }, 6000);
    }

    // Handle Function
    const handleProvinceSelect = e=>{
        fetchCinema(e.target.value);
    }

    const handleCinemaSelect = e=>{
        fetchRoom(e.target.value);
    }

    const handleMovieClick = (id)=>{
        console.log(data.province_id, "1");
        const newData = {...data};

        if(newData.movie_id===id){
            newData.movie_id = "";
        }else{
            newData.movie_id = id;
        }
        console.log(data.province_id, "2");
        setData(newData);
    }

    const handleShowTimeDate = (value)=>{
        const newData = {...data};
        const d = value;
        const date = d.toISOString().split('T')[0];
        const time = d.toTimeString().split(' ')[0];

        newData.show_time_date = `${date} ${time}`;
        newData.show_time_date_check = `${date} 00:00:00`;
        setData(newData);
    }

    const handleReset = ()=>{
        const newData ={...data};
        const newGroups = {};
        newData.province_id= "";
        // newData.provinces= [];
        newData.cinema_id= "";
        newData.cinemas= [];
        newData.rooms_id= [];
        newData.rooms= [];
        // newData.movies= [];
        newData.movie_id= "";
        // data.movie_name_search= "";
        // newData.show_time_date= "";
        setGroups(newGroups);
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

    const handlePageNext = ()=>{
        setPage(page+1);
    }

    const handlePagePrevious = ()=>{
        setPage(page-1);
    }

    const handleToggle = value => {
        const currentIndex = data.rooms_id.indexOf(value);
        const newChecked = [...data.rooms_id];
        const newData = {...data};
        if (currentIndex === -1) {
            newChecked.push(value);
            fetchShowTimeByRoom(value);

        } else {
            newChecked.splice(currentIndex, 1);
            let newGroups = {...groups};
            delete newGroups[value];
            setGroups(newGroups);
        }
        newData.rooms_id = newChecked;
        setData(newData);
    };

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
                <GridItem xs={12} sm={12} md={12}>

                    {/*Create New Province*/}
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Create New Show Time</h4>
                            {/*<p className={classes.cardCategoryWhite}>Complete your profile</p>*/}
                        </CardHeader>
                        <CardBody>
                            <GridContainer>

                                {/*Movie Item*/}
                                <GridItem xs={12} sm={12} md={4} >
                                    {
                                        data.movie_id !=="" &&
                                        data.movie_id !==null &&
                                        data.movie_id !==undefined ?
                                            (
                                                <Box display="flex" justifyContent="center">
                                                    <br/>
                                                    <FirmItem movieId={data.movie_id} />
                                                </Box>
                                            ) :
                                            (<></>)
                                    }
                                </GridItem>

                                <GridItem xs={12} sm={12} md={8}>
                                    <GridContainer>
                                        {/*Province select*/}
                                        <GridItem xs={12} sm={12} md={6}>
                                            <FormControl className={classes.select}>
                                                <InputLabel htmlFor="province">Province</InputLabel>
                                                <Select
                                                    native
                                                    value={data.province_id}
                                                    onChange={handleProvinceSelect}
                                                    inputProps={{
                                                        name: 'province',
                                                        id: 'province',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    {
                                                        data.provinces!==[] ?
                                                            data.provinces.map(
                                                                (province,index)=>(
                                                                    <option
                                                                        value={province.province_id}
                                                                        key={index}
                                                                    >
                                                                        {province.province_name}

                                                                    </option>
                                                                )
                                                            ) :
                                                            (<></>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem>

                                        {/*Time select*/}
                                        <GridItem xs={12} sm={12} md={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    className={classes.picker}
                                                    label="Show Time Date"
                                                    format="yyyy/MM/dd"
                                                    disablePast
                                                    value={data.show_time_date}
                                                    onChange={handleShowTimeDate}
                                                    animateYearScrolling
                                                />
                                            </MuiPickersUtilsProvider>
                                        </GridItem>

                                        {/*Cinema select*/}
                                        <GridItem xs={12} sm={12} md={6}>
                                            <FormControl className={classes.select}>
                                                <InputLabel htmlFor="cinema">Cinema</InputLabel>
                                                <Select
                                                    native
                                                    value={data.cinema_id}
                                                    onChange={handleCinemaSelect}
                                                    inputProps={{
                                                        id: 'cinema',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    {
                                                        data.cinemas!==undefined && data.cinemas!==[] ?
                                                            data.cinemas.map(
                                                                (cinema,index)=>(
                                                                    <option
                                                                        value={cinema.cinema_id}
                                                                        key={index}
                                                                    >
                                                                        {cinema.cinema_name}

                                                                    </option>
                                                                )
                                                            ) :
                                                            (<></>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem>

                                        {/*Time hour select*/}
                                        <GridItem xs={12} sm={12} md={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <TimePicker
                                                    className={classes.picker}
                                                    clearable
                                                    ampm={false}
                                                    format="HH:mm:ss"
                                                    label="Pick Time (24 hours)"
                                                    value={data.show_time_date}
                                                    onChange={handleShowTimeDate}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </GridItem>

                                        {/*Room*/}
                                        <GridItem xs={12} sm={12} md={6} >
                                            <Box display="flex" flexWrap="wrap">
                                                {
                                                    data.rooms.length === 0 ?
                                                        (<></>) :
                                                        (
                                                            data.rooms.map(
                                                                (room, index)=>(
                                                                    <Box
                                                                        width="50%"
                                                                        key={index}
                                                                    >
                                                                        <br/>
                                                                        <Checkbox
                                                                            tabIndex={-1}
                                                                            onClick={() => {
                                                                                handleToggle(room.room_id);
                                                                            }
                                                                            }
                                                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                                                            icon={<Check className={classes.uncheckedIcon} />}
                                                                            classes={{
                                                                                checked: classes.checked
                                                                            }}
                                                                        />
                                                                        {room.room_name}
                                                                        <br/>
                                                                    </Box>
                                                                )
                                                            )
                                                        )
                                                }
                                            </Box>
                                        </GridItem>

                                    </GridContainer>
                                </GridItem>



                            </GridContainer>
                        </CardBody>

                        {/*Card Footer*/}
                        <CardFooter>
                            <Button color="primary"
                                    onClick={CreateNewShowTime}
                            >
                                Create New</Button>
                            <Button color="primary"
                                    onClick={handleReset}
                            >
                                Reset</Button>
                        </CardFooter>

                    </Card>

                </GridItem>

                <GridItem xs={12} sm={12} md={4}>

                    {/*Card Movies*/}
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
                                tableData={table.Content.slice((page*5),5+(page*5))}
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

                <GridItem xs={12} sm={12} md={8}>

                    <Card profile>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Current Show Time</h4>
                        </CardHeader>
                        <CardBody profile>

                            Table room show time
                            <GridContainer>
                                {
                                    Object.values(groups).map(
                                        (value, index)=>{
                                            let roomId= value[0][1];
                                            let roomName = data.rooms.map(
                                                (room)=>{
                                                    if(room.room_id===roomId){
                                                        return room.room_name
                                                    }
                                                }
                                            ).filter(Boolean)[0];
                                            return(<Table
                                                    key={index}
                                                    tableHeaderColor="primary"
                                                    tableHead={[
                                                        roomName
                                                        ,"Time Start", "Time End","Movie Name"]}
                                                    tableData={
                                                        value.map(
                                                            (valueIndex)=>{
                                                                let a = valueIndex.slice(2);
                                                                a.unshift("");
                                                                return a;
                                                            }
                                                        )
                                                    }
                                                />
                                            )}
                                    )
                                }
                            </GridContainer>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default CreateNewCinema;