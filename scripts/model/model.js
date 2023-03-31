import { baseUrl, apiKey } from "../utility.js";

class model {

    state = {
        searchResults: [],
        selectedMovie: null,
        errorMessage: '',
        isSuccess: true,
    }

    async search(searchValue, selectedGenre) {

        try {

            let timeOut,
                endPoint,
                data;

            timeOut = new Promise((_, reject) => {
                setTimeout(() => {
                    reject('Took too long to respond, please try again later');
                }, 20000);
            });

            if (selectedGenre)
                endPoint = fetch(`${baseUrl}/AdvancedSearch/${apiKey}/?title=${searchValue}&genres=${selectedGenre.toLowerCase()}`);
            else
                endPoint = fetch(`${baseUrl}/SearchTitle/${apiKey}/${searchValue}`);

            data = await Promise.race([endPoint, timeOut]).then(res => res.json()).catch((error) => {

                throw new Error(error);
            });

            this.state.searchResults = data.results;
            this.state.isSuccess = true;

        } catch (error) {
            this.state.isSuccess = false;
            this.state.errorMessage = error.message;
        }
    }

    async selectMovie(id) {

        try {

            let timeOut,
                endPoint,
                data;

            timeOut = new Promise((_, reject) => {
                setTimeout(() => {
                    reject('Took too long to respond, please try again later');
                }, 20000);
            });

            endPoint = fetch(`${baseUrl}/Title/${apiKey}/${id}`);

            data = await Promise.race([endPoint, timeOut]).then(res => res.json()).catch((error) => {

                throw new Error(error);
            });

            this.state.selectedMovie = data;
            this.state.isSuccess = true;

        } catch (error) {
            this.state.isSuccess = false;
            this.state.errorMessage = error.message;
        }
    }
}

export default new model();