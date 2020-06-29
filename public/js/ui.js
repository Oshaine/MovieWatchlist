const movies = document.querySelector('.movies');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const adminItems = document.querySelectorAll('.admin')
document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add movie form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
  //register modal
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});


//hide link
const hideLink = (user)=>{
  if(user){
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    loggedInLinks.forEach(item => item.style.display = 'block');
  }else{
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    adminItems.forEach(item => item.style.display = 'none');

  }
}

//render  data
const renderMovie = (data, id) => {
    const html = `
<div class="card-panel movie white row" data-id="${id}">
  <img src="/img/icons/icon-96x96.png" alt="movie thumb">
  <div class="movie-details">
    <div class="movie-title">${data.title}</div>
    <div class="movie-genre">${data.genre}</div>
    <div class="movie-description">${data.description}</div>
  </div>
  <div class="movie-delete">
  <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons" data-id="${ id}">delete_outline</i></a>
  </div>
</div>

`;
    movies.innerHTML += html;
 
;}

//remove item from DOM
const removeMovie = (id) => {
  const movie = document.querySelector(`.movie[data-id=${id}]`);
  movie.remove();//remove item from DOM
}