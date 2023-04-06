// import other modules
import model from "./model/model.js";
import searchView from "./views/searchView.js";
import movieView from "./views/movieView.js";

class controller {

    #searchField = document.getElementById(`search-field`);
    #selectedGenre = document.getElementById('selected-genre');

    // search controller
    async controlSearchField() {

        searchView.renderLoading();

        const specialChars = /[^a-zA-Z0-9 ]/g;
        const searchValue = this.#searchField.value;

        // check if input is not valid or less than 3 characters
        if (searchValue.split('').length < 3 || searchValue.match(specialChars))
            return searchView.renderError('⚠ The input is not valid');

        const selectedGenre = this.#selectedGenre.dataset.value;

        await model.search(searchValue, selectedGenre);

        // check if server returns error or nothing found
        if (!model.state.isSuccess || model.state.searchResults.length === 0)
            return searchView.renderError(model.state.errorMessage || 'No matching found');

        searchView.render(model.state.searchResults);
    }

    // select a specific movie controller
    async controlSelectMovie(id) {

        movieView.renderLoading();

        await model.selectMovie(id);

        // check if server returns error or the response has specific error
        if (!model.state.isSuccess || model.state.selectedMovie.errorMessage)
            return movieView.renderError(model.state.errorMessage || model.state.selectedMovie.errorMessage);

        movieView.render(model.state.selectedMovie);
    }

    init() {
        searchView.searchHandler(this.controlSearchField.bind(this));
        searchView.selectMovieHandler(this.controlSelectMovie.bind(this));
        movieView.selectRelatedMovieHandler(this.controlSelectMovie.bind(this));
        searchView.init();
    }
}

const instance = new controller();
instance.init();