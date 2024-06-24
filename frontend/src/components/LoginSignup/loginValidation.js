function validation(values) {
    let error = {};

    if (values.username === "") {
        error.username = "Email should not be empty";
    } else {
        error.username = "";
    }

    if (values.password === "") {
        error.password = "Email should not be empty";
    } else {
        error.password = "";
    }
    return error;
}

export default validation;