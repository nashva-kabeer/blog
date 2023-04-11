function deletearticle(id){
    var result = confirm("Delete Article! Confirm?")
    if(result){
        location.href = "/article/delete/"+id
    }
}