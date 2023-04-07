function signupvalidate(){
    if(document.getElementById("name").value ==''){
        document.getElementById("error").innerHTML ='Enter Your Name';
        return false;
    }else if(document.getElementById("password").value ==''){
        document.getElementById("error").innerHTML ='Enter Your Password';
        return false;
    }else{return true;} 
}