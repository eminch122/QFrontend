import React, { useEffect, useState } from "react";
import {  useGoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import axios from "axios";
import GoogleMain from "./subGoogleTest/googleMain";

type Props = {
};

const Google: React.FC<Props> = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  useEffect(()=>{
    if (accessToken) {
      sessionStorage.setItem('accessToken',accessToken);
    }
  },[accessToken])
  
  const login = useGoogleLogin({
    onSuccess: codeResponse => {
      axios.post('http://localhost:3000/register', { code: codeResponse.code})
        .then(response => {
          setAccessToken(response.data.accessToken)
         
        })
        .catch(error => {
          // handle error
        });  
        
    },
  
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/business.manage'
  });
  
 
  console.log(accessToken)
  return (
    
   <>
   
   {accessToken ? (
      // Show this content when there's a response
      <div>
          <GoogleMain accessToken={accessToken}/>
      </div>
    ) : (
      // Show the login button when there's no response yet
      <div className='wrapper d-flex justify-content-center align-items-center' style={{backgroundColor:'#D9D9D9'}}>
         
        <div className="card d-flex flex-column justify-content-center align-items-center">
         <div className="shape"/>
          <div className="card-header">
            <img src="/assets/img/logo.png" alt="Logo" className="card-img-top"/>
          </div>
          <div className="card-body text-center ">
            <h5 className="card-title">QChannel</h5>
            <p className="card-text ">By signing in with Google to Qchannel, you'll have access to the hotel details where you can update the lodging accomodation.<br/>It's quick and easy!</p>
          </div>
          <div className="card-footer"> 
            <div onClick={() => login()}>
              <div id="customBtn">
                <span className="icon"></span>
                <span className="buttonText">Google</span>
              </div>
            </div>
          </div>
          <div className="shape"/>
        </div>

      </div>
      
    )}
    </>
    
  );
};


export default Google;
