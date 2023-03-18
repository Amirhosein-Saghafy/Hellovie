import model from "./model/model.js";
import searchView from "./views/searchView.js";

class controller {

    #searchField = document.getElementById(`search-field`);
    #selectedGenre = document.getElementById('selected-genre');

    async controlSearchField() {

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

    init() {
        searchView.searchHandler(this.controlSearchField.bind(this));
    }
}

const instance = new controller();
instance.init();