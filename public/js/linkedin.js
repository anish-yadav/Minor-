

 login = () => {
    console.log("Linkedin login")
    window.open("https://www.linkedin.com")
}

linkedinlogin = () => {
    IN.User.authorize(login);
}

linkedinlogoutuser = () => {
        IN.User.logout();
        IN.User.logout();
        IN.User.logout();
        IN.User.logout();
        alert("logged out successfully")
}
