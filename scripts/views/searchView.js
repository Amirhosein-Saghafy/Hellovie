class searchView {

    #errorMessage = ``;
    #parentElement = document.querySelector('.search');

    render(movies) {

        this.#parentElement.querySelector('.search-result').classList.add('show');

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
                        <span>${movie.description}</span>
                    </div>
                </div>
            </a>`;

            this.#parentElement.querySelector('.search-result').insertAdjacentHTML('afterbegin', markup);
        });
    }

    renderError(message) {

        this.#parentElement.querySelector('.search-result').classList.add('show');

        this.#errorMessage = message;

        let messageElement = `<span>${this.#errorMessage}</span>`;

        this.#parentElement.querySelector('.search-result').innerHTML = '';

        this.#parentElement.querySelector('.search-result').insertAdjacentHTML("afterbegin", messageElement);
    }

    searchHandler(handler) {

        this.typeHandler();

        this.selectGenreHandler();

        this.#parentElement.addEventListener('click', function (e) {

            const searchButton = e.target.closest('.search-button');

            if (!searchButton)
                return;

            handler();
        });
    }

    typeHandler() {

        this.#parentElement.addEventListener('keyup', (e) => {

            const searchField = e.target.closest('.search-field');

            if (!searchField)
                return;

            this.#parentElement.querySelector('.search-result').classList.remove('show');
        });
    }

    selectGenreHandler() {

        const selectGenreBox = this.#parentElement.parentElement.querySelector('.select-category');

        selectGenreBox.addEventListener('click', (e) => {

            const selectGenreButton = e.target.closest('.select-heading');

            if (!selectGenreButton)
                return;

            selectGenreBox.querySelector('.select-container').classList.toggle('open');
        });

        const selectOptions = [...selectGenreBox.querySelectorAll('.select-value')];

        selectOptions.forEach(option => {
            
            option.addEventListener('click', (e) => {
                selectGenreBox.querySelector('.select-heading span').innerHTML = e.target.innerHTML;
                selectGenreBox.querySelector('.select-heading span').dataset.value = e.target.dataset.value;
                selectGenreBox.querySelector('.select-container').classList.remove('open');
            });
        });
    }
}

export default new searchView();