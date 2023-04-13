function deletemanager(id){
    var result = confirm("Delete Topic Manager! Confirm?")
    if(result){
        location.href = "/admin/deletemanager/"+id
    }
}