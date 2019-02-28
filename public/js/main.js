function myfonction() {
    window.open('/users/login','_self')
}

function logoutAll() {
    fbLogoutUser();
    linkedinlogoutuser();
    setTimeout(myfonction, 5000);
    
}