import model from "./model/model.js";
import searchView from "./views/searchView.js";

class controller {

    #searchField = document.getElementById(`search-field`);
    #searchButton = document.querySelector('.search-button');
    #selectedGenre = document.getElementById('selected-genre');

    async controlSearchField() {

        const searchValue = this.#searchField.value;
        const specialChars = /[^a-zA-Z0-9 ]/g;
        const selectedGenre = this.#selectedGenre.Value;

        if (searchValue.split('').length < 3 || searchValue.match(specialChars))
            return searchView.renderError('⚠ The input is not valid');

        if (selectedGenre !== '')
            await model.search(searchValue, selectedGenre);
        else
            await model.search(searchValue);

        searchView.render(model.state.searchResults);
    }

    init() {

        this.#searchButton.addEventListener('click', this.controlSearchField.bind(this));
    }
}

const instance = new controller();
instance.init();