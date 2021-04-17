import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Box, CircularProgress, TextField} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import axios from "axios";


const useStyles = makeStyles((theme)=>({
    root:{
        color: "#AAAAAA",
        // backgroundColor: theme.palette.background.default,
        width: 200,
        marginTop: 25,
        boxShadow: "none",
        marginLeft: 15,
        marginRight: 15,
    },
    loading:{
        width: 200,
        height: 410,
        marginTop: 25,
        boxShadow: "none",
        marginLeft: 15,
        marginRight: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    actionArea:{
        position: "relative",
    },
    media: {
    height: 300,
    backgroundSize: "cover",
    backgroundPosition: "center",
    },
    // },
    overplayIcon:{
        fontSize: "3rem",
        color: "white",
        transform: "scale(0.8)",
        opacity: 0,
        transition: "all 0.3s",
    },
    
      action:{
          padding: 0,
      },
      
      icon: {
        cursor: "pointer",
        transition: "0.3s",
      },
}));

const FirmItem = (props)=>{

    const classes = useStyles();
    const [item, setItem] = React.useState(null);
    const {
        movieId,
    } = props;


    async function fetchItem(){
      let response = await axios(
          `http://localhost/Cinema/Movie/GetMovieItem/${movieId}`
      );
      let resItem = await response.data.data;

        setTimeout(function() {
            setItem(resItem);
        }, 3000);
    }

    React.useEffect(
      ()=>{
          fetchItem();
      },[]
    )
    React.useEffect(
        ()=>{
            setItem(null);
            fetchItem();
        },[movieId]
    )


    if(!item){
        return(
            <Box className={classes.loading}>
                <CircularProgress color="secondary" />
            </Box>
            );
    }else {
        return (
            <Card className={classes.root}>
                {/*<Link to={(movieId !== "0") ? `/movie/${movieId}` : "/"} onClick={scrollToTop}>*/}
                    <CardActionArea className={classes.actionArea} component="div">
                        <CardMedia
                            component="img"
                            height="140"
                            className={classes.media}
                            image={
                                item !== {} ?
                                    item.avatar_url : ""
                            }
                            title="Contemplative Reptile"
                        />
                        {/*<Box className={classes.overplay}>*/}
                        {/*    <PlayCircleFilledIcon*/}
                        {/*        className={classes.overplayIcon}*/}
                        {/*    />*/}
                        {/*</Box>*/}
                    </CardActionArea>
                {/*</Link>*/}
                <CardActions className={classes.action}>
                    <Box display="flex" width="100%">
                        <Box >
                            <Typography variant='h6' mb={1} style={{margin: "15px 0 10px 0"}}>
                                {
                                    item ?
                                        item.movie_name : ""
                                } <br/>
                            </Typography>
                            <Typography variant="subtitle2">
                                {
                                    item ?
                                        item.duration : ""
                                }&nbsp;MIN
                                &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    item ?
                                        item.main_type : ""
                                }
                            </Typography>
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        )
    }
}


FirmItem.propTypes= {
    id: PropTypes.string,
}

FirmItem.defaultProps = {
    id: "0",
}

export default FirmItem;