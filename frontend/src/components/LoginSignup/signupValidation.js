function validation(values) {
    let error = {};
    if (values.username === "") {
        error.username = "Username should not be empty";
    } else {
        error.username = "";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else {
        error.password = "";
    }
    return error;
}

export default validation;