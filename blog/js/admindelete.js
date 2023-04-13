function userdelete(id){
    var result = confirm("Deleting User! Confirm?")
    if(result){
        location.href = "/admin/delete/"+id;
    }
}

function rejectuser(userid){
    var result = confirm("Reject User! Confirm?")
    if(result){
        location.href = "/admin/reject/"+userid
    }
}

function approveuser(userid){
    var result = confirm("Approve User! Confirm?")
    if(result){
        location.href = "/admin/approve/"+userid
    }
}