function rejectarticle(id){
    var result = confirm("Reject Article! Confirm?")
    if(result){
        location.href = "/topicmanager/rejectarticle/"+id
    }
}

function approvearticle(id){
    var result = confirm("Approve Article! Confirm?")
    if(result){
        location.href = "/topicmanager/approvearticle/"+id
    }
}