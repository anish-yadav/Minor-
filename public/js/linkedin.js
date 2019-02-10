 login = () => {
    console.log("Linkedin login")
}

linkedinlogin = () => {
    IN.User.authorize(login);
}
linkedinlogoutuser = () => {
    IN.User.logout(login())
}
