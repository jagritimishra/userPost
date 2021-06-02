import React, { useState, useEffect} from "react";
import { useHistory, Route, Switch ,Redirect} from "react-router-dom";
import firebase from  'firebase';


import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


// tmp 
import Tooltip from '@material-ui/core/Tooltip';


// 

//icon
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//



import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridList from '@material-ui/core/GridList';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert'



import preLoader from './preLoader.gif';


import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


// this is the App Bar

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// this end of App Bar
const navBar = makeStyles({
  root: {
    width: 500,
  },
});



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin:0,
    maxWidth: 500,
  
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  gridList: {
    width: 500,
    height: 650,
  },
  input: {
    display: 'none',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    flexGrow: 1,
  },
}));

var  config= {
  apiKey: "AIzaSyDCg9ECOg1TscYO9Luwqc0lPVVBzPYGfd4",
    authDomain: "todo-6ca93.firebaseapp.com",
    databaseURL: "https://todo-6ca93-default-rtdb.firebaseio.com",
    projectId: "todo-6ca93",
    storageBucket: "todo-6ca93.appspot.com",
    messagingSenderId: "949362404046",
    appId: "1:949362404046:web:139ba1b77e64464e21be9f"
};
// Initialize Firebase
firebase.initializeApp(config);
let  recaptchaVerifier;
let coderesult;

var TmpconfirmationResult;


function App() {
    const history = useHistory();
    const [render,setRender]=useState(null);
    const [value, setValue] = React.useState('recents');
    const classes = navBar();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(()=>{
      var phoneNumber=localStorage.getItem('phoneNumber');
      if(phoneNumber==null){
        setRender(true);
      }else{
        setRender(false);
      }
    },[]);
   
    return (
        <>
        
          {
            (render===true)?
              (
                <>
                <Redirect to="/Login"/>
                <Switch>
                  <Route exact path="/Login" component={Login}/>
                </Switch>
                </>
              )
              
            :
              (
                (render==null)?
                  null
                :
                <div>


                  <Redirect to="/Home"/>

                  <div  style={{
                    position:'absolute',
                    bottom:0,
                  }}>
                    <BottomNavigation value={value} onChange={handleChange} className={classes.root}
                      style={{
                        borderTopWidth:1
                      }}
                    >
                   
                   <Tooltip title="Home" interactive>
                    <BottomNavigationAction variant="dot" label="Home" value="Home" icon={<HomeIcon />} 
                        onClick={()=>{
                          history.push('/Home');
                        }}
                      />
                  </Tooltip>
                  
                    <Tooltip title="Add Task" interactive>
                      <BottomNavigationAction style={{
                            marginBottom:30,
                          }} value="favorites" icon={<AddCircleIcon style={{
                            fontSize:50,
                            color:'#e07858'
                          }} />} 
                          onClick={()=>{
                            history.push('/AddTask');
                          }}
                      />
                  </Tooltip>
                  <Tooltip title="Profile" interactive>
                  <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleIcon />} 
                    onClick={()=>{
                        history.push('/Profile');
                      }}
                  />
                  </Tooltip>
                  </BottomNavigation>
                </div>
                <div>
                  <Switch>
                    <Route exact path="/Home" component={Home}/>
                    <Route exact path="/Logout" component={LogOut}/>
                    <Route exact path="/About" component={About}/>
                    <Route exact path="/Profile" component={Profile}/>
                    <Route exact path="/Contact" component={Contact}/>
                    <Route exact path="/Gallery" component={Gallery}/>
                    <Route exact path="/AddTask" component={AddTask}/>
                    <Route exact path="/Login" component={Login}/>
                </Switch>
              </div>
             </div>   
              )
          }
          
        </>
    );
}
// 

function Profile(){
  const [items,setItems]=useState([]);
  const [phoneNumber,setPhoneNumber]=useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [location,setLocation]=useState('');

  useEffect(()=>{
    var phoneNumber=localStorage.getItem('phoneNumber');
    setPhoneNumber(phoneNumber);
    firebase.database().ref(`${phoneNumber}`).on('value', snapshot => {
      let data = snapshot.val();
      console.log(data);


 
      setItems(data['Profile']);
    });
    
  },[]);


    return(
      <div>
         
      </div>
    );
}




function Home(){

  const [items,setItems]=useState([]);
  const [render,setRender]=useState(null); 
  const [noItem,setNoItem]=useState(null);
  const classes = useStyles();
    useEffect(()=>{
      var phoneNumber=localStorage.getItem('phoneNumber');
      firebase.database().ref(`${phoneNumber}/Task`).on('value', snapshot => {
        let data = snapshot.val();
        Object.size = function(obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        // Get the size of an object
        var size = Object.size(data);
        // console.log("Object Size :"+ size);      
        if(size>0){
          let itemsVal = Object.values(data);
          // this.setState({ items });
          setItems(itemsVal);
          setRender(true);
        }else{
          setNoItem(true);
        }
      });
      
    },[]);


    if(noItem===true){
      return (
        <div>
          <h1>No Task'</h1>
          <h3>Add Task</h3>
          </div>
      )

    }
    else if(render===true){
      return(
        <>

        <div style={{
          width:500,
          
        }}>
        <AppBar position="static" style={{
          backgroundColor:'#e17844'
        }}>
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>

            {/* The Tummy */}
            ToDo
          </Typography>
          <Button color="inherit" onClick={LogOut}>Logout</Button>
        </Toolbar>
      </AppBar>
        </div>
        <GridList cellHeight={160} className={classes.gridList} cols={1}>

           

            {

              
              
              items.map((Value,index)=>{
                  return(
                   

                    <div className={classes.root} key={index}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                          
                          <Grid item xs={7} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                  {Value.taskName}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                {Value.Description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                Added At :  {Value.taskDate}
                                </Typography>
                              </Grid>
                             
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1"></Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  )
              })
            }
            </GridList>
            </>
      );
    }
    else{
      var img='2.jpg';
      return(
        <div style={{
          justifyContent:'center',
          alignItems:'center',
          width:500,
          marginTop:150,
          textAlign:'center'
        }}>
          <img alt="complex" src={preLoader} key={52}/>
          </div>
      );
    }
    
      
  // }

}
// 

function LogOut(){
  localStorage.removeItem('phoneNumber');
  window.location.assign('/Home');
  return null;
}




function AddTask(){
  const history = useHistory();
  const [value,setValue]=useState('');
  const [description,setDescription]=useState('');
  const classes = useStyles();
  const [render,setRender]=useState(null);
  if(render===true){
    setTimeout(()=>{
      setRender(false);
    },2000);
    return(
      <>
        <Alert variant="filled" severity="success">
          The Task  Has Been Added !
        </Alert>
      </>
    );
  } 
  return(
    <div >
    <Paper style={{
      justifyContent:'center',
      alignItems:'center',
      maxWidth:500,
      margin:10,
      padding:20,
      textAlign:'center',
    }}

    >
      <TextField
          id="outlined-error-helper-text"
          label="Enter Task  Name "
          variant="outlined"
          value={value}
          onChange={(Value)=>{setValue(Value.target.value)}}></TextField><br></br><br></br>
      <TextField
          style={{
            width:200
          }}
          value={description}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={8}
          variant="outlined"
        
         onChange={(Value)=>{
        setDescription(Value.target.value);
      }}></TextField> <br></br><br></br>
      {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        Upload Image <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label><br></br><br></br> */}


      <Button
        variant="contained"
        color="secondary"
        // className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
        
        onClick={()=>{
        var phoneNumber=localStorage.getItem('phoneNumber');
        var key = firebase.database().ref(`${phoneNumber}`).child(`/Task`).push().key;

        {/* this is the Real Time Database */}

          var d = new Date();

              firebase.database().ref(`${phoneNumber}/Task`).child(`${key}`).set({
                  taskName:value,
                  taskDate:`${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`,
                  Description:description,
                  Key:key
              });

        setValue('')
        setDescription('');
        setRender(true);
      }}>Add</Button>
    </Paper>
    </div>
  );
}

function About(){
    return(
      <h1>hello from About</h1>
    );
}
function Contact(){
  return(
    <h1>hello from Contact</h1>
  );
}
function Gallery(){
  return(
    <h1>hello from Gallery</h1>
  );
}



function Login(){
  const classes = useStyles();
  const [number,setNumber]=useState('');
  const [code,setCode]=useState('');
  const [forDisplay,setForDisplay]=useState('none');
  const [render,setRender]=useState(false);
  const [tmpRender,setTmpRender]=useState(null); 
  function phoneAuth(){
    var tmpNumber=number;
    tmpNumber="+91"+number;
    firebase.auth().signInWithPhoneNumber(tmpNumber,recaptchaVerifier).then(function(confirmationResult){
    
      TmpconfirmationResult=confirmationResult;
      coderesult=confirmationResult;
      console.log(coderesult);
      alert("Message Sent");
      setForDisplay('block');
    }).catch(function(error){
      alert('Something went\'s wrong Please Try Again !');
    });
  }

  function codeverify(){  
    coderesult.confirm(code).then(function(result){
      localStorage.setItem('phoneNumber',number);

          firebase.database().ref(number).child('/Profile').set({
            Name:'',
            Dob:'',
            Location:'',
            PhoneNo:number,

          });
          setTimeout(()=>{
            window.location.assign('/Home');
          },2000);

var user=result.user;
      // // console.log(user);
      setTmpRender(true);
    }).catch(function(error){
      alert(error.message);
      setRender(true);
    });
  }

  useEffect(()=>{
    render(); 
    function render(){
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      recaptchaVerifier.render();
      console.log('from render')
    }
  },[render]);

  return(


    <div style={{
      justifyContent:'center',
      alignItems:'center',
    }}>
    <Paper style={{
      maxWidth:300,
      margin:10,
      padding:20,
    }}>


      

      <TextField
          id="outlined-error-helper-text"
          label="Enter Mobile Number"
          variant="outlined"
          onChange={(Value)=>{setNumber(Value.target.value)}}    
      ></TextField><br></br><br></br>

          <div id="recaptcha-container" style={{
            borderWidth:1
          }}></div>
      
      <br></br><br></br>
      
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={()=>{
        phoneAuth()
      }}>Send Code </Button>
      <br></br><br></br><br></br><br></br>
      <div id="CodeContainer" style={{display:forDisplay}}>
        <TextField
          id="outlined-error-helper-text"
          label="Enter Code"
          variant="outlined"
          value={code} onChange={(Value)=>{setCode(Value.target.value)}}></TextField><br></br><br></br>
        <Button
        variant="contained"
        color="secondary"
        // className={classes.button}
        startIcon={<CheckCircleIcon />}
         onClick={()=>{codeverify()}}>Submit</Button>
      </div>

     
    </Paper>
      
    </div>

);
}






// function Login(){
//   const [number,setNumber]=useState('');
//   const [tmpRender,setTmpRender]=useState(null); 

//     return(
//     <>
//       <input type="text" onChange={(Value)=>{setNumber(Value.target.value)}}></input><br></br>
//       <button onClick={()=>{
//         localStorage.setItem('phoneNumber',number);
//         firebase.database().ref(number).child('/Profile').set({
//           Name:'',
//           Dob:'',
//           Location:'',
//           PhoneNo:'',

//         });
//         setTimeout(()=>{
//            window.location.assign('/Home');
//         },2000);
//         setTmpRender(true);
//       }}>Login </button>
//     </>
//   );
// }
export default App;