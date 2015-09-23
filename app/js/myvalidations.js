function validatecntrls() {
    var id = document.getElementById("txtid").value;
    var name = document.getElementById("txtName").value;
    var retval = false;
    if (id == "") {
        alert("please enter id");
    }
    else if (name == "") {
        alert("please enter name");
    }
    else {
        retval = true;
    }

    return retval;
}