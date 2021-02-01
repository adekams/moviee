const list = document.querySelector('.movie-list')
const search = document.querySelector('input')

const imgPath = "https://image.tmdb.org/t/p/w1280"
const searchPath = "https://api.themoviedb.org/3/search/movie?api_key=ef4a985bb7a3ecdb2dd036b385d74175&query="

const TMdburl = 'https://api.themoviedb.org/3/discover/movie?api_key=ef4a985bb7a3ecdb2dd036b385d74175'


const movieApp = async(url) => {

    try {
        let res = await axios.get(url)
        console.log(res)
        let data = await res.data.results

        console.log(data)

        data.forEach(movie => {
            const el = document.createElement('DIV')
            const image = document.createElement('IMG')
            const title = document.createElement('H2')
            const text = document.createElement('P')
            const release = document.createElement('SPAN')

            el.setAttribute('class', 'movie')
             image.src = `${imgPath}${movie.poster_path}` 
            title.innerHTML = `${movie.title}` 
            release.innerHTML = `Release Date:${movie.release_date}`
            text.innerHTML = `${movie.overview}`

            el.appendChild(image)
            el.appendChild(title)
            el.appendChild(release)
            el.appendChild(text)
            list.appendChild(el)
            
        });
    } catch (error) {
        console.log(error)
    }
    
}



search.addEventListener('keyup', (e) => {
    e.preventDefault()

    let searchTerm = search.value
    if (searchTerm) { 
          list.innerHTML = ''    
        console.log(search.value)       
        movieApp(searchPath + searchTerm)
        // search.value = ''

        console.log(list.length)       

    }
})

movieApp(TMdburl)
