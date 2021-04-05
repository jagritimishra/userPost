import React, { useState, useEffect} from "react";
import { useHistory, Route, Switch ,Redirect} from "react-router-dom";
import firebase from  'firebase';


import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';



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
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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
    margin: 'auto',
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
  apiKey: "AIzaSyCIqd8b7ioJz9_9M_XlSSZdVRxOy2tyrxw",
  authDomain: "demotodolist-38d60.firebaseapp.com",
  databaseURL: "https://demotodolist-38d60-default-rtdb.firebaseio.com",
  projectId: "demotodolist-38d60",
  storageBucket: "demotodolist-38d60.appspot.com",
  messagingSenderId: "506549109371",
  appId: "1:506549109371:web:1c9a7c79f686f7a04fd8de"
};
// Initialize Firebase
firebase.initializeApp(config);
let  recaptchaVerifier;
let  TmpconfirmationResult;
let coderesult;


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
                    <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} 
                      onClick={()=>{
                        history.push('/Home');
                      }}
                    />
                  <BottomNavigationAction style={{
                        marginBottom:30,
                      }} value="favorites" icon={<AddCircleOutlineIcon style={{
                        fontSize:50,
                        color:'#e07858'
                      }} />} 
                      onClick={()=>{
                        history.push('/AddFoods');
                      }}
                  />
                  <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleIcon />} 
                    onClick={()=>{
                        history.push('/Profile');
                      }}
                  />
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
                    <Route exact path="/AddFoods" component={AddFoods}/>
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
      <>
      {/* <GridList cellHeight={160} className={classes.gridList} cols={1}>
        <Paper className={classes.paper}>
          <TextField id="standard-basic" defaultValue={items['Name']} />              
        </Paper>
          </GridList> */}
          <input value={items.Name}></input>
        </>
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
          <h1>No Items'</h1>
          <h3>Add Items</h3>
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
                   

                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase className={classes.image}>
                              {/* <img className={classes.img} alt="complex" src={Value.Images} key={index}/> */}
                              
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={7} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                  {Value.Name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                {Value.Description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                Added At :  {Value.Date}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer',color:'red' }}>
                                  {Value.Process}...
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




function AddFoods(){
  const history = useHistory();
  const [value,setValue]=useState('');
  const [description,setDescription]=useState('');
  const classes = useStyles();
  
  return(
    <div >
    <Paper style={{
      justifyContent:'center',
      alignItems:'center',
      maxWidth:500,
      margin:10,
      padding:20,
      textAlign:'center',
    }}>


      {/*  */}
      

      <TextField
          id="outlined-error-helper-text"
          label="Enter Foods Name "
          variant="outlined"
          onChange={(Value)=>{setValue(Value.target.value)}}></TextField><br></br><br></br>
      <TextField
          style={{
            width:200
          }}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={8}
          variant="outlined"
        
         onChange={(Value)=>{
        setDescription(Value.target.value);
      }}></TextField> <br></br><br></br>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        Upload Image <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label><br></br><br></br>


      <Button
        variant="contained"
        color="secondary"
        // className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
        
        onClick={()=>{
        var phoneNumber=localStorage.getItem('phoneNumber');
        var key = firebase.database().ref(`${phoneNumber}`).child(`/Task`).push().key;

        {/* this is the image Storage */}
        

        // const sender_post_name=document.getElementById("_post_name").value;
				var image=document.getElementById("icon-button-file").files[0];
        var imageType=document.getElementById("icon-button-file").files[0].type;
        imageType=imageType.substring(imageType.lastIndexOf("/") + 1);
				console.log("Image type "+imageType);
        
				// var imageName=image.name;


        var image_root=firebase.storage().ref(`image/${phoneNumber}/${key}.${imageType}`);
        var uploadTask=image_root.put(image);

        uploadTask.on('state_changed',function(snapshot){
					// get progress bar
					var progressBar=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
					console.log(progressBar);
				 },function(error){
					console.log(error.message);
				 },function(){
					// handle sucessfull upload
					uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
						// get your upload url 
							console.log(downloadURL);
              setTimeout(()=>{

              },2000);
              var d = new Date();

              firebase.database().ref(`${phoneNumber}/Task`).child(`${key}`).set({
                  Name:value,
                  Date:`${d.getSeconds()}:${d.getMinutes()}:${d.getHours()}::  || ${d.getDay()}/${d.getMonth()}/${d.getFullYear()} `,
                  Images:downloadURL,
                  Description:description,
                  Process:'pending',
                  Key:key
              });
						});
					});
        console.log(key);
        
        setTimeout(()=>{
          history.push('/Home');
        },3000);
        return(<Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert>)
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