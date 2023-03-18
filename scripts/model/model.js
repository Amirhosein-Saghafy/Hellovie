import { baseUrl, apiKey } from "../utility.js";

class model {

    state = {
        searchResults: [],
    }

    async search(searchValue, selectedGenre = null) {

        const data = await fetch(`${baseUrl}/SearchTitle/${apiKey}/${searchValue}`).then(res => res.json());
        
        this.state.searchResults = data.results;
    }
}

export default new model();