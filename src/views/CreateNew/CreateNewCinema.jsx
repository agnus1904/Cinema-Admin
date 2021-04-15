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
        province_name: "",
        province_id: "",
        provinces: [],
        cinema_name: "",
        cinema_id: "",
        cinemas: [],
        rooms: [],
        seat_number: "",
    });
    const [table, setTable] = React.useState({
        Title: "",
        header: [],
        Content: [],
    });

    // Create New function
    const fetchDataCreateProvince = async()=>{
        let dataFetch = new FormData();
        dataFetch.append("province_name", data.province_name);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewProvince`, dataFetch
        );
        let res = await response.data;
        setStatus(res.message);
        setOpen(true);
        res.error? setColor("danger") : setColor("success") ;
    }

    const fetchDataCreateCinema= async ()=>{
        let dataFetch = new FormData();
        dataFetch.append("province_id", data.province_id);
        dataFetch.append("cinema_name", data.cinema_name);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewCinema`, dataFetch
        );
        let res = await response.data;
        setStatus(res.message);
        setOpen(true);
        res.error? setColor("danger") : setColor("success") ;
    }

    const fetchDataCreateRoom= async ()=>{
        let dataFetch = new FormData();
        dataFetch.append("province_id", data.province_id);
        dataFetch.append("cinema_id", data.cinema_id);
        dataFetch.append("room_type", "1");
        dataFetch.append("seat_number", data.seat_number);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewRoom`, dataFetch
        );
        let res = await response.data;
        console.log(res, "response");
        setStatus(res.message);
        setOpen(true);
        res.error === true ? setColor("danger") : setColor("success") ;
        fetchRoom(data.cinema_id);
    }

    // Get Datas from Database
    const fetchProvince = async ()=>{
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetProvince`
        );

        let res = await response.data;

        const newData = {...data};
        newData.provinces = res.data;
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

    console.log(data, "cinemas");


    // Show Datas To Table
    const showProvinces = async ()=>{
        let newArray = [];
        for(let province of data.provinces){
            newArray.push(Object.values(province))
        }
        let newTalbe={...table};
        newTalbe.Content = newArray;
        newTalbe.header = ["Province Id", "Province Name"];
        newTalbe.Title = "Current Province";
        setTable(newTalbe);
    }

    const showCinemas = async ()=>{
        let newArray = [];
        let newTable={...table};
        if (data.province_id===""){
            newTable.Content=[];
            newTable.header = [];
            newTable.Title = "";
            setTable(newTable);
            setOpen(true);
            setColor("danger");
            setStatus("Please Choose a Province to see Cinemas");
            return
        }
        for(let cinema of data.cinemas){
            newArray.push(Object.values(cinema))
        }
        newTable.header = ["Cinema Id", "Cinema Name"];
        newTable.Title = "Current Cinema";
        newTable.Content = newArray;
        setTable(newTable);
    }

    const showRooms = async ()=>{
        let newArray = [];
        let newTable={...table};
        if(data.province_id==="" || data.province_id===null){
            newTable.Content=[];
            newTable.header = [];
            newTable.Title = "";
            setTable(newTable);
            setOpen(true);
            setColor("danger");
            setStatus("Please Choose a Province and Cinema to see Rooms");
            return;
        }
        if(data.cinema_id==="" || data.cinema_id===null){
            newTable.Content=[];
            newTable.header = [];
            newTable.Title = "";
            setTable(newTable);
            setOpen(true);
            setColor("danger");
            setStatus("Please Choose a Cinema to see Rooms");
            return;
        }
        for(let room of data.rooms){
            newArray.push(Object.values(room))
        }
        newTable.header = ["Room Id", "Room Name", "Seat Number"];
        newTable.Title = "Current Room";
        newTable.Content = newArray;
        setTable(newTable);
    }


    // Life Cycle Hooks
    React.useEffect(
        ()=>{
            fetchProvince();
        },[]
    );
    if(open===true){
        setTimeout(function() {
            setOpen(false);
        }, 6000);
    }

    // Handle Function
    const handleProvinceName = e=>{
        const newData = {...data};
        newData.province_name = e.target.value;
        setData(newData);
    }

    const handleCinemaName = e=>{
        const newData = {...data};
        newData.cinema_name = e.target.value;
        setData(newData);
    }

    const handleProvinceSelect = e=>{
        fetchCinema(e.target.value);
    }

    const handleCinemaSelect = e=>{
        fetchRoom(e.target.value);
    }

    const handleSeatNumber = e=>{
        const newData = {...data};
        newData.seat_number =e.target.value;
        setData(newData);
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
                                            onChange: handleProvinceName,
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
                                    onClick={fetchDataCreateProvince}>
                                Create New</Button>
                            <Button color="primary"
                                    onClick={showProvinces}
                            >
                                See Current Province</Button>
                        </CardFooter>
                    </Card>

                    {/*Create New Cinema*/}
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Create New Cinema</h4>
                            {/*<p className={classes.cardCategoryWhite}>Complete your profile</p>*/}
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={classes.select}>
                                        <InputLabel htmlFor="province">Province</InputLabel>
                                        <Select
                                            native
                                            label="Province"
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
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Cinema Name"
                                        id="cinema_name"
                                        inputProps={{
                                            onChange: handleCinemaName,
                                            defaultValue: data.cinema_name,
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary"
                                    onClick={fetchDataCreateCinema}
                            >Create New</Button>
                            <Button color="primary"
                                    onClick={showCinemas}
                            >See Current Cinema</Button>
                        </CardFooter>
                    </Card>

                    {/*Create New Room*/}
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Create New Room</h4>
                            {/*<p className={classes.cardCategoryWhite}>Complete your profile</p>*/}
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                {/*select province*/}
                                <GridItem xs={12} sm={12} md={4}>
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

                                {/*select cinema*/}
                                <GridItem xs={12} sm={12} md={4}>
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

                                {/*Number of seat*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Number of seat"
                                        id="numberOfSeat"
                                        inputProps={{
                                            onChange: handleSeatNumber,
                                            defaultValue: data.cinema_name,
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
                                    onClick={fetchDataCreateRoom}
                            >Create New</Button>
                            <Button color="primary"
                                    onClick={showRooms}
                            >See Current Cinema</Button>
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
