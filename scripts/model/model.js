import { baseUrl, apiKey } from "../utility.js";

class model {

    state = {
        searchResults: [],
        errorMessage: '',
        isSuccess: true,
    }

    async search(searchValue, selectedGenre = undefined) {

        try {
            
            let data;
            
            if (selectedGenre)
                data = await fetch(`${baseUrl}/AdvancedSearch/${apiKey}/?title=${searchValue}&genres=${selectedGenre.toLowerCase()}`).
                    then(res => res.json()).
                    catch(() => {
                        throw new Error('Something went wrong, please try again later');
                    });
            else
                data = await fetch(`${baseUrl}/SearchTitle/${apiKey}/${searchValue}`).
                    then(res => res.json()).
                    catch(() => {
                        throw new Error('Something went wrong, please try again later');
                    });

            this.state.searchResults = data.results;

        } catch (error) {
            this.state.isSuccess =false;
            this.state.errorMessage = error.message;
        }
    }
}

export default new model();