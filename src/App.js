import React, { useState, useEffect} from "react";
import {Route, Switch , useParams} from "react-router-dom";
import firebase from  'firebase';



import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import preLoader from './preLoader.gif';




import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    position:'relative',
    margin:'auto',
    marginTop:50,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(15),
    height: theme.spacing(15),
    boxShadow:'0px 0px 5px 2px #d8534f',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  CardStyle:{
    boxShadow:'0px 1px 3px 1px #d8534f',
  },
}));


var  config= {
  apiKey: "AIzaSyCNkKdfmcK_YCsgfZ6m7ISpVgvp-h-HhzE",
  authDomain: "thetummyproject-2021.firebaseapp.com",
  databaseURL: "https://thetummyproject-2021-default-rtdb.firebaseio.com",
  projectId: "thetummyproject-2021",
  storageBucket: "thetummyproject-2021.appspot.com",
  messagingSenderId: "957049101924",
  appId: "1:957049101924:web:4798c4c8856c867a168971",
};
// Initialize Firebase
firebase.initializeApp(config);


function App() {
    
   
    return (
      
      <Switch>
	        <Route exact path="/userPost" component={FetData}/>
      </Switch>

      );
}


const FetData = ()=>{
  let Parameter=useParams(); 
  const classes = useStyles();
  const [userData,setUserData]=useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(()=>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var userId = urlParams.get('userId');
    var PostId = urlParams.get('PostId');
    firebase
    .database()
    .ref(`Post/${userId}`)
    .child(PostId)
    .on('value',(PostData)=>{
      if(PostData.val()!=null){
        let data=[];
        firebase
        .database()
        .ref(`Post_Items`)
        .child(PostId)
        .on('value',(PostItemData)=>{
          if(PostItemData.val()!=null){
            let Data =Object.values(PostItemData.val());
            data = [...data,Data[0][0]];
            firebase
            .database()
            .ref('User_Profile')
            .child(Data[0][0].userUID)
            .on('value',(userProfile)=>{
              if(userProfile.val()!=null){
                data[0]['firstName']=userProfile.val().firstName;
                data[0]['logo']=userProfile.val().logo;
                setUserData(data);
              }else{
                return <h1>No Data Found</h1>
              }
            })
          }else{
            return <h1>No Data Found</h1>
          }
        })

    }else{
      return <h1>No Data Found</h1>
    }
    });
  
  },[])
 
  return(
    <>
      {
        userData.length >0 ?

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Card className={classes.root}>

            <div className={classes.paper}>
              <Avatar className={classes.avatar} src={userData[0]['logo']}>
              </Avatar>
              <Typography component="h1" variant="h5">
                {userData[0]['firstName']}
              </Typography>
            </div>

            <div className={classes.CardStyle}> 
            <CardHeader
              action={userData[0]['postStatus'] =='pending' ? 
                  <h3 style={{color:'red'}}>Post Status:{userData[0]['postStatus']}</h3>
                 :
                 <h3 style={{color:'green'}}>Post Status:{userData[0]['postStatus']}</h3>
              }
              title={userData[0]['itemName']}
              subheader={userData[0]['cookingTime']}
            />
            <CardMedia
              className={classes.media}
              image={userData[0]['image'][0]}
              title={`${userData[0]['veg']} ${userData[0]['itemName']}`}
            />
       
            <CardActions disableSpacing>
              <h2>{userData[0]['veg']}</h2>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Share to Your Friends :</Typography>
                <Typography paragraph>
                    That They Can Help To The Hunger People.
                </Typography>
              </CardContent>
            </Collapse>
            </div>
        </Card>


      </Container>

        :
        <div style={{
          textAlign:'center',
          paddingTop:20,
          position:'relative',
          margin:'auto',
        }}>
        <img alt="complex" src={preLoader} key={52}/>
        </div>
    }
    </>
  )
}
export default App;