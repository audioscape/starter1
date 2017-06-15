$(document).ready(function() {
  jQuery(document).ready(function($){
    var $form_modal = $('.cd-user-modal'),
      $form_login = $form_modal.find('#cd-login'),
      $form_signup = $form_modal.find('#cd-signup'),
      $form_forgot_password = $form_modal.find('#cd-reset-password'),
      $form_modal_tab = $('.cd-switcher'),
      $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
      $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
      $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
      $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
      $main_nav = $('.main-nav');
    // Event handler to open modal on signup tab
    $('.cd-signup').on('click', function(event){
      if( $(event.target).is($main_nav) ) {
        // on mobile open the submenu
        $(this).children('ul').toggleClass('is-visible');
      } else {
        // on mobile close submenu
        $main_nav.children('ul').removeClass('is-visible');
        //show modal layer
        $form_modal.addClass('is-visible');
        //show the selected form
        ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
      }
    });
    // Event handler to open modal on signin tab
    $('.cd-signin').on('click', function(event){
      if( $(event.target).is($main_nav) ) {
        // on mobile open the submenu
        $(this).children('ul').toggleClass('is-visible');
      } else {
        // on mobile close submenu
        $main_nav.children('ul').removeClass('is-visible');
        //show modal layer
        $form_modal.addClass('is-visible');
        //show the selected form
        ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
      }
    });
    // Close modal with clicking "close" button
    $('.cd-user-modal').on('click', function(event){
      if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
        $form_modal.removeClass('is-visible');
      }
    });
    $('.cd-user-modal').on('submit', function(event){
      if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
        $form_modal.removeClass('is-visible');
      }
    });
    $('form#register-form').on('submit', function(event) {
      form = $('form#register-form');            
      if(validateForm()) {
        $form_modal.removeClass('is-visible');
      }
    })
    // Close modal with "ESC" key on keyboard
    $(document).keyup(function(event){
        // User hits "esc" key on keboard for escaping modal form
        if(event.which=='27'){
          $form_modal.removeClass('is-visible');
        }
        // User hits "enter" key on keboard for submitting a form / modal
        if(event.which=='13'){
          $form_modal.removeClass('is-visible');
        }
    });
    // Switching from one tab on Modal form to the other
    $form_modal_tab.on('click', function(event) {
      event.preventDefault();
      ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
    });
    // Hide or show password
    // $('.hide-password').on('click', function(){
    //  var $this= $(this),
    //    $password_field = $this.prev('input');
    //
    //  ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    //  ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
    //
    //  // Focus and move cursor to end of inputs
    //  $password_field.putCursorAtEnd();
    // });
    // Show the "forgot password" form
    $forgot_password_link.on('click', function(event){
      event.preventDefault();
      forgot_password_selected();
    });
    // Back to "login" form from "forgot password" form
    $back_to_login_link.on('click', function(event){
      event.preventDefault();
      login_selected();
    });
    function login_selected(){
      $form_login.addClass('is-selected');
      $form_signup.removeClass('is-selected');
      $form_forgot_password.removeClass('is-selected');
      $tab_login.addClass('selected');
      $tab_signup.removeClass('selected');
    }
    function signup_selected(){
      $form_login.removeClass('is-selected');
      $form_signup.addClass('is-selected');
      $form_forgot_password.removeClass('is-selected');
      $tab_login.removeClass('selected');
      $tab_signup.addClass('selected');
    }
    function forgot_password_selected(){
      $form_login.removeClass('is-selected');
      $form_signup.removeClass('is-selected');
      $form_forgot_password.addClass('is-selected');
    }
    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if(!Modernizr.input.placeholder){
      $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
          }
      }).blur(function() {
        var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
          input.val(input.attr('placeholder'));
          }
      }).blur();
      $('[placeholder]').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
          })
      });
    }
  });
  jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        if (this.setSelectionRange) {
            var len = $(this).val().length * 2;
            this.setSelectionRange(len, len);
        } else {
            $(this).val($(this).val());
        }
    });
  };

  var action = getURLParameter('action');
  if (action == null) { action = "signin";}

  if (location.host == 'data.georgia.org') {
    // Hide fireBase status feedback on live site.
    $(".quickstart-user-details-container").hide();
  }

        // Firebase Auth
        var isSignIn = false;
        function getURLParameter(name) {
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }
        function toggleSignIn() {
          isSignIn = true;
          if (firebase.auth().currentUser) {
            // Firebase Auth Signout
            firebase.auth().signOut();
          } else {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
              alert('Please enter an email address.');
              return;
            }
            if (password.length < 4) {
              alert('Please enter a password.');
              return;
            }
            // Firebase Auth - signInWithEmailAndPassword(email, password)
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Catch Firebase Errors
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                  alert('Wrong password.');
              } else {
                  alert(errorMessage);
              }
              console.log(error);
              document.getElementById('quickstart-sign-in').disabled = false;
            });
          }
          document.getElementById('quickstart-sign-in').disabled = true;
        }
        function handleSignUp() {
          isSignIn = false;
          var email = document.getElementById('register-email').value;
          var password = document.getElementById('register-password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Firebase signing in with existing Email + Password
          firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
              } else {
                  alert(errorMessage + " errorCode: " + errorCode);
              }
              console.log(error);
          });
        }
        // Firebase send email verification to user
        function sendEmailVerification() {
          firebase.auth().currentUser.sendEmailVerification().then(function() {
            alert('We\'ve send an email to you to verify your account. Please click the link in the email to complete your sign up.');
          });
        }
        function sendPasswordReset() {
          var email = document.getElementById('reset-email').value;
          firebase.auth().sendPasswordResetEmail(email).then(function() {
            alert('Password Reset Email Sent!');
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
            console.log(error);
          });
        }
        /**
         * initApp handles setting up UI event listeners and registering Firebase auth listeners:
         *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
         *    out, and that is where we update the UI.
         */
        function initApp() {
            // Firebase Auth listening for Auth state changes
            firebase.auth().onAuthStateChanged(function(user) {
                //document.getElementById('quickstart-verify-email').disabled = true;
                var firstName = document.getElementById('first_name').value;
                var lastName = document.getElementById('last_name').value;
                var occupation = document.getElementById('occupation').value;
                var corgaName = document.getElementById('corga_name').value;
                var duns = document.getElementById('duns').value;
                var domain = document.getElementById('domain').value;
                if (user) {
                    // User is signed in.
                    $('.cd-signin').hide();
                    $('.cd-signup').hide();
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    // Store user information into Firebase Realtime Database
                    document.getElementById('email').value = email;
                    if(emailVerified == false){
                      if(isSignIn == false) {   //if this is the sign up process
                        //alert("isSignIn == false");
                        //store user information in realtime database
                        var database = firebase.database();
                        database.ref('users/' + uid).set({
                          email : email,
                          firstName: firstName,
                          lastName: lastName,
                          occupation: occupation,
                          corgaName: corgaName,
                          duns: duns,
                          domain: domain
                        }).then(function () {   //send email, so the user can be added to the realtime database, once they verify.
                          sendEmailVerification();
                          firebase.auth().signOut();
                        });
                      }
                    }
                    $(".cd-signout").show();
                      //alert(user.uid);
                      $(document).ready(function() {
                        Cookies.set('at_f', user.uid); // For site wrap
                      });
                      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
                      
                      firebase.database().ref('users/' + uid).once('value').then(function(snapshot){
                        var customInfo = snapshot.val();
                        document.getElementById('first_name').value = customInfo.firstName;
                        document.getElementById('last_name').value = customInfo.lastName;
                        document.getElementById('corga_name').value = customInfo.corgaName;
                        document.getElementById('domain').value = customInfo.domain;
                        document.getElementById('occupation').value = customInfo.occupation;
                        document.getElementById('quickstart-account-custom-details').textContent = JSON.stringify(snapshot.val(), null, '  ');
                        document.getElementById('quickstart-sign-in').disabled = false;
                      })
                      if (Cookies.get("gologon")) {
                        var gologon = Cookies.get("gologon");
                        Cookies.remove("gologon");
                        // Add checkbox to disable on localhost
                        window.location = gologon;
                      } else {
                        //window.location = "/site/?no-gologon"
                        window.location = "/defense/?no-gologon"
                      }
                } else {
                    $(".cd-signin").show();
                    $('.cd-signin').trigger("click");
                    document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                    document.getElementById('quickstart-sign-in').textContent = 'Sign in';
                    document.getElementById('quickstart-sign-in').disabled = false;
                    document.getElementById('quickstart-account-details').textContent = 'null';
                    document.getElementById('quickstart-account-custom-details').textContent = 'null';
                }
            });
            document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
            // document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
            //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
            document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
        
            $(document).ready(function() { 
              if (action == "signin" || action == "signout") { // Trigger for both. Avoids error if user tries to sign-in when already signed in.
                $('.cd-signout').trigger("click");
              }
            });
        }
        window.onload = function() {
            initApp();
        };
            function onSignIn(googleUser) {
                console.log('Google Auth Response', googleUser);
                // We need to register an Observer on Firebase Auth to make sure auth is initialized.
                var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
                    unsubscribe();
                    if (!isUserEqual(googleUser, firebaseUser)) {
                        var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
                        firebase.auth().signInWithCredential(credential).catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // The email of the user's account used.
                            var email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            var credential = error.credential;
                            if (errorCode === 'auth/account-exists-with-different-credential') {
                                alert('You have already signed up with a different auth provider for that email.');
                            } else {
                                console.error(error);
                            }
                        });
                    } else {
                        console.log('User already signed-in Firebase.');
                    }
                });
            }
        function isUserEqual(googleUser, firebaseUser) {
            if (firebaseUser) {
                var providerData = firebaseUser.providerData;
                for (var i = 0; i < providerData.length; i++) {
                    if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                        providerData[i].uid === googleUser.getBasicProfile().getId()) {
                        return true;
                    }
                }
            }
            return false;
        }
        // function handleSignOut() {
        //     var googleAuth = gapi.auth2.getAuthInstance();
        //     googleAuth.signOut().then(function() {
        //         firebase.auth().signOut();
        //     });
        // }
        /**
         * initApp handles setting up UI event listeners and registering Firebase auth listeners:
         *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
         *    out, and that is where we update the UI.
         */
        /*function initApp() {
            // Auth state changes.
            // [START authstatelistener]
            firebase.auth().onAuthStateChanged(function(user){
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    // [START_EXCLUDE]
                    document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                    document.getElementById('signout').disabled = false;
                    document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
                    // [END_EXCLUDE]
                } else {
                    // User is signed out.
                    // [START_EXCLUDE]
                    document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                    document.getElementById('signout').disabled = true;
                    document.getElementById('quickstart-account-details').textContent = 'null';
                    // [END_EXCLUDE]
                }
            });
            // [END authstatelistener]
            document.getElementById('signout').addEventListener('click', handleSignOut, false);
        }
        window.onload = function() {
            initApp();
        };*/
        function firebaseSignout() {
          firebase.auth().signOut();
          $(".cd-signout").hide();
          console.log("Signed Out");
          if (Cookies.get("gologout")) {
            var gologout = Cookies.get("gologout");
            Cookies.remove("gologout");
            // Add checkbox to disable on localhost
            window.location = gologout;
          }
        }
         $('form#register-form').on('submit', function(event){
          event.preventDefault();
          var reg_email = $("#register-email").val();
          var reg_password = $("#register-password").val();
          //console.log("EMAIL INPUT: " + reg_email);
          //console.log("PASSWORD INPUT: " + reg_password);
          if(validateForm()) {                  
            handleSignUp();
          }
          // function createFireUser(email, password) {
          //     if (email.length < 4) {
          //       alert('Please enter an email address.');
          //       return;
          //     }
          //     if (password.length < 4) {
          //       alert('Please enter a password.');
          //       return;
          //     }
          //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          //       var errorCode = error.code;
          //       var errorMessage = error.message;
          //
          //       if (errorCode == 'auth/weak-password') {
          //         alert('The password is too weak.');
          //       } else {
          //         alert(errorMessage);
          //       }
          //
          //       console.log(error);
          //     }).then(function(response) {
          //       console.log("USER CREATED SUCCESSFULLY");
          //       console.log(response);
          //     });
          // };
          //
          // createFireUser(reg_email, reg_password);
        });
        $("#quickstart-sign-out").on("click", function(){
          firebaseSignout();
        });
        var options = {
            url: function(phrase) {           
              return "https://georgia-defense-php.herokuapp.com/public/searchCompanies.php?query=" + phrase;
            },
            list: {
              onSelectItemEvent: function() {
                var value = $("#corga_name").getSelectedItemData().duns;
                $("#duns").val(value).trigger("change");
              },
              onHideListEvent: function() {
                if($('.easy-autocomplete-container ul li').length == 0) {
                  $("#duns").val("na");  
                }
              }
            },                    
            getValue: "companyname"
          };
        $("#corga_name").easyAutocomplete(options);
      });
      function validateForm() {
        if($('#first_name').val().length == 0) {
          alert('Please enter First Name');
          return false;
        }
        if($('#last_name').val().length == 0) {
          alert('Please enter Last Name');
          return false;
        }
        if($('#occupation').val().length == 0) {
          alert('Please enter Occupation');
          return false;
        }
        if($('#corga_name').val().length == 0) {
          alert('Please enter Company Name');
          return false;
        }
        return true;
      }