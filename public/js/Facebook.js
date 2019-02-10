function fblogin () {
  FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
}); 
}
  
 
  
    function fbLogoutUser() {
       console.log("started")
         FB.getLoginStatus(function(response) {
            console.log(response)
          if (response && response.status === 'connected') {
           console.log("Fuck me")
            FB.logout(function(response) {
                document.location.reload();
                console.log(response)
            });
        } 
})
    }

  
