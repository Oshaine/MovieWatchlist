//ofline data mangement
db.enablePersistence()
.catch(err =>{
    if(err.code == 'persistence failed'){
        //multiple tabs
        console.log('persistence failed');
    }else if(err.code =='unimplemented'){
        //not supported by browser
        console.log('persistence not svsilsble');
    }
});

//file upload

// const file = document.querySelector('#image').file[0];
// const name = new Date() + '-' + file.name;
// const metaData ={
//     contentType:file.type
// }

// const task = storage.child(name).put(file,metaData);
//add new item
const movieForm = document.querySelector('#movie-form');
movieForm.addEventListener('submit', evt =>{
    evt.preventDefault();

    const u = firebase.auth().currentUser;
    const movie = {
        title: movieForm.title.value,
        genre: movieForm.genre.value,
        description: movieForm.description.value,
       // image: movieForm.image.value,
    };
    //save to database
    db.collection('movies').add(movie)
    .catch(err=> console.log(err));

    movieForm.title.value ='';
    movieForm.description.value ='';
});

//update item


//delete item
const movieContainer = document.querySelector('.movies');
movieContainer.addEventListener('click', evt =>{
    //console.log(evt);
    if(evt.target.tagName ==='I'){
        const id = evt.target.getAttribute('data-id');
        //delete item by id
        db.collection('movies').doc(id).delete();
    }
});

