

 login = () => {
    console.log("Linkedin login")
    window.open("https://www.linkedin.com")
}

linkedinlogin = () => {
    IN.User.authorize(login);
}

linkedinlogoutuser = () => {
        IN.User.logout();
        console.log("logged out successfully")
}
