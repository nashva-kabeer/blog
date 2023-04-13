function topicdelete(id){
    var result = confirm("Delete Topic! Confirm?")
    if(result){
        location.href = "/admin/subjectdelete/"+id
    }
}