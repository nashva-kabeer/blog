function userdelete(id){
    var result = confirm("Deleting User! Confirm?")
    if(result){
        location.href = "/delete/"+id;
    }
}