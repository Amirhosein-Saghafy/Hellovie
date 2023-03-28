import model from "./model/model.js";
import searchView from "./views/searchView.js";
import movieView from "./views/movieView.js";

class controller {

    #searchField = document.getElementById(`search-field`);
    #selectedGenre = document.getElementById('selected-genre');

    async controlSearchField() {

        searchView.renderLoading();

        const searchValue = this.#searchField.value;
        const specialChars = /[^a-zA-Z0-9 ]/g;
        const selectedGenre = this.#selectedGenre.dataset.value;

        if (searchValue.split('').length < 3 || searchValue.match(specialChars))
            return searchView.renderError('⚠ The input is not valid');

        await model.search(searchValue, selectedGenre);

        if (!model.state.isSuccess)
            return searchView.renderError(model.state.errorMessage);

        searchView.render(model.state.searchResults);
    }

    async controlSelectMovie(id) {

        movieView.renderLoading();

        await model.selectMovie(id);

        if (!model.state.isSuccess)
            return movieView.renderError(model.state.errorMessage);

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