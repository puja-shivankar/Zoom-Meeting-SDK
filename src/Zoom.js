import React, { useEffect } from 'react'
import { ZoomMtg } from '@zoomus/websdk';
const crypto= require ('crypto')
function generateSignature(apiKey,apiSecret,meetingNumber,role){
    return new Promise=((res,resp)=>{
        const timestamp=new Date().getTime() -30000
        const msg= Buffer.from(apiKey+meetingNumber+timestamp+role).toString('base64')
        const hash= crypto.createHmac('sha256',apiSecret).update(msg).digest('base64')
        const signature= Buffer.from(`${apiKey},${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
       
        res(signature);
    })
}
var signature="";
generateSignature(apiKey,apiSecret,meetingNumber,0).then((res)=>{
    signature=res;
})
    // lHXpJlNCSSmNdfxYQneq7A apikey
    // y1aVCJHiFxzjHRySQwMKvotUKnOtIJPkw4Ar api secret
    // secretToken= SpZQe4H3TjCgDKzfi7BL9g
    // verification token= -uD4gEFDSYGJsOP4IzCkVw

    // jwt= eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImxIWHBKbE5DU1NtTmRmeFlRbmVxN0EiLCJleHAiOjE2NzQ0Nzg0MTMsImlhdCI6MTY3NDQ3MzAxNH0.KzX-uMuEMPS0d3uMnXsxMQp-s-Za5TQPoAOVGDnnJFQ
   

// console.log(generateSignature(process.env.API_KEY,process.env.API_SECRET,123456789,0))


var apiKey= "lHXpJlNCSSmNdfxYQneq7A"
var apiSecret="y1aVCJHiFxzjHRySQwMKvotUKnOtIJPkw4Ar"
var meetingNumber=85306182032
var leaveUrl="http:localhost:3000"
var userName="WebSDK"
var userEmail="test@gmail.com"
var passWord="QYkF3i"



export default function Zoom() {
    useEffect(()=>{
        showZoomDiv();
      ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib','/av');
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
        initiateJoinMeeting();
    },[]);

    const showZoomDiv=()=>{
        document.getElementById('zmmtg-root').style.display='block';
    }
    const initiateJoinMeeting=()=>{
        ZoomMtg.init({
            leaveUrl: leaveUrl,
            success: (success) => {
              console.log(success)
          
              ZoomMtg.join({
                signature: signature,
                meetingNumber: meetingNumber,
                userName: userName,
               
                userEmail: userEmail,
                passWord: passWord,
                success: (success) => {
                  console.log(success)
                },
                error: (error) => {
                  console.log(error)
                }
              })
          
            },
            error: (error) => {
              console.log(error)
            }
          })

    }
    
  return (
    <div>Zoom</div>
  )
}
