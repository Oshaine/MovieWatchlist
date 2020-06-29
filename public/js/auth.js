//auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    
    user.getIdTokenResult().then(idTokenResult=>{
    user.admin = idTokenResult.claims.admin;
    hideLink(user);
    });
  
    //real-time listiner
    db.collection('movies').onSnapshot((snapshot) => { 
      snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id)
        if (change.type === 'added') {
          //add the document data to the web page
          renderMovie(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
          //remove the documenet data from the web
          removeMovie(change.doc.id);
        }

      });
    });
  } else {
    hideLink(user);
  
  }
})


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;
  //signup user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    window.location = '/index.html';
  });
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', evt => {
  evt.preventDefault();
  auth.signOut().then(()=>{
    console.log('user logged out');
  });
});


//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    //window.location = '/index.html';
  });
});

//make admin
const adminForm = document.querySelector('#admin-actions');
adminForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});