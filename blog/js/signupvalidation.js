function signupvalidate(){
    if(document.getElementById("name").value ==''){
        document.getElementById("error").innerHTML ='Enter Your Name';
        return false;
    }else if(document.getElementById("mailid").value ==''){
        document.getElementById("error").innerHTML ='Enter Your MailId';
        return false;
    }else if(document.getElementById("ph").value ==''){
        document.getElementById("error").innerHTML ='Enter Your Phone';
        return false;
    }else if(document.getElementById("password").value ==''){
        document.getElementById("error").innerHTML ='Enter Your password';
        return false;
    }else{return true;} 
}