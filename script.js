// Ambil Data
const titleName = document.getElementById('titleName')
const directorName = document.getElementById('directorName')
const year = document.getElementById('year')
const btnTambah = document.getElementById('btnTambah')
const movieForm = document.getElementById('movieForm')
const movieList = document.getElementById('movieList')

let isEditing = false
let selectedIndex = null

// Buat Array  untuk menyimpan film
const film = [];

// Buat fungsi untuk menampilkan (READ) data film
function showFilm()
{
    movieList.innerHTML = ''

    for(let i =0; i < film.length; i++){
        const movieItem = film[i]
        const li = document.createElement('li')

        li.innerHTML = `<span>${movieItem.title}</span> - <span>${movieItem.director}</span> - <span>${movieItem.year}</span>
        <button onclick="deleteFilm(${i})">Delete</button>
        <button onclick="editFilm(${i})">Edit</button>
        `
        movieList.appendChild(li)
    }
}
// Buat fungsi untuk menambahkan (CREATE) data film
function addFilm(movie){
    film.push(movie)
    showFilm()
}


// Buat fungsi untuk mengubah data film
function updateFilm(index, movie){
    film[index] = {...film[index], ...movie}
    showFilm()
}
//Buat fungsi edit data
function editFilm(index){
    const selectedMovie = film[index]
    titleName.value = selectedMovie.title
    directorName.value = selectedMovie.director
    year.value = selectedMovie.year

    isEditing = true

    btnTambah.textContent = 'Update'

    selectedIndex = index
}
// Buat fungsi untuk menghapus (DELETE) data film
function deleteFilm(index){
    film.splice(index, 1)
    showFilm()
}
showFilm()
movieForm.addEventListener('submit', function(e){
    e.preventDefault()

    if (isEditing){
        updateFilm(selectedIndex, {
            title: titleName.value,
            director: directorName.value,
            year: year.value
        })

        return
    }
    addFilm({
        title: titleName.value,
        director: directorName.value,
        year: year.value,

    })
    showFilm()
    titleName.value = ''
    directorName.value = ''
    year.value =''
})