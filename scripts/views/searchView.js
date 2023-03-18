class searchView {

    #errorMessage = ``;
    #parentElement = document.querySelector('.search');

    render(movies) {

        this.#parentElement.querySelector('.search-result').innerHTML = '';

        movies.forEach(movie => {

            const markup = `
            <a class="result-item">
                <div class="result-img">
                    <img src="${movie.image}" alt="movie-image">
                </div>
                <div class="result-description">
                    <div class="result-name">
                        <h4>${movie.title}</h4>
                    </div>
                    <div class="result-details">
                        <span>${movie.description   }</span>
                    </div>
                </div>
            </a>`;

            this.#parentElement.querySelector('.search-result').insertAdjacentHTML('afterbegin', markup);
        });
    }

    renderError(message) {

        this.#errorMessage = message;

        let messageElement = `<span>${this.#errorMessage}</span>`;

        this.#parentElement.querySelector('.search-result').innerHTML = '';

        this.#parentElement.querySelector('.search-result').insertAdjacentHTML("afterbegin", messageElement);
    }
}

export default new searchView();