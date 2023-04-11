function userdelete(id){
    var result = confirm("Deleting User! Confirm?")
    if(result){
        location.href = "/admin/delete/"+id;
    }
}