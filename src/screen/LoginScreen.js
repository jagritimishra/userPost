import React,{useState,useEffect} from 'react';
import firebase from  'firebase';
import {useHistory} from 'react-router-dom'



// Your web app's Firebase configuration
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
  // firebase.initializeApp(config);
  let  recaptchaVerifier;
  let  TmpconfirmationResult;
  let coderesult;
const LoginScreen=()=>{
      const history=useHistory();
    const [number,setNumber]=useState('');
    const [code,setCode]=useState('');
    const [forDisplay,setForDisplay]=useState('none');
    const [render,setRender]=useState(false);
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
        alert("Code Sucessfull Sent");
        var user=result.user;
        // console.log(user);
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
        position:'relative',
        margin:'auto',
        width:500,
        textAlign:'center',
        marginTop:200,
        borderBottomWidth:1
      }}>

      <div style={{
      
      }}> 
        <input value={number} placeholder="Enter Value " onChange={(Value)=>{setNumber(Value.target.value)}}></input>
        <div id="recaptcha-container" style={{}}></div>


        <button onClick={()=>{
          // var key = firebase.database().ref().child(`/Task`).push().key;
          // firebase.database().ref('/Tmp').child(`${key}`).set({
          //   name:number
          // });
          // console.log(key);
          phoneAuth()
        }}>Send Code </button>
        </div>
        <div id="CodeContainer" style={{display:forDisplay}}>
          <input value={code} onChange={(Value)=>{setCode(Value.target.value)}}></input>
          <button onClick={()=>{codeverify()}}>Submit</button>
        </div>
      </div>
  );
}
export default LoginScreen;    