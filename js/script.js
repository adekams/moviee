const spinner = document.querySelector(".spinner");
const list = document.querySelector(".movie-list");
const search = document.querySelector("input");

//get api key
const theKey = config.THE_KEY;

const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchPath =
  "https://api.themoviedb.org/3/search/movie?api_key=" + theKey + "&query=";

const tmdbUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + theKey;

const movieApp = async (url) => {
  try {
    let res = await axios.get(url);
    let data = await res.data.results;
    console.log(data);

    // for each movie..
    data.forEach((movie) => {
      // create tags to hold the movie information
      const el = document.createElement("DIV");
      const image = document.createElement("IMG");
      const imgWrapper = document.createElement("FIGURE");
      const title = document.createElement("H2");
      const text = document.createElement("P");
      const info = document.createElement("DIV");
      const ratings = document.createElement("SPAN");

      el.setAttribute("class", "movie");
      info.setAttribute("class", "info");
      ratings.setAttribute("class", "ratings");
      image.src = `${imgPath}${movie.poster_path}`;
      title.innerHTML = `${movie.title}`;
      ratings.innerHTML = `${movie.vote_average}`;
      text.innerHTML = `${movie.overview}`;

      spinner.style.display = "none";

      el.appendChild(imgWrapper);
      imgWrapper.appendChild(image);

      el.appendChild(title);
      el.appendChild(ratings);
      info.appendChild(text);
      el.appendChild(info);
      list.appendChild(el);
    });
  } catch (error) {
    console.log(error);
    spinner.innerHTML = "Please connect to the internet or check your network.";
  }
};

// search through the page for a keyword when a letter is entered
search.addEventListener("keyup", (e) => {
  e.preventDefault();

  let searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    list.innerHTML = "";
    console.log(search.value);
    spinner.style.display = "block";
    movieApp(searchPath + searchTerm);
    // search.value = ''
    console.log(list.length);
  } else {
    window.location.reload();
  }
});

movieApp(tmdbUrl);
