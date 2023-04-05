class searchView {

    #errorMessage = ``;
    #parentElement = document.querySelector('.search');

    renderLoading() {

        this.#parentElement.querySelector('.search-result').classList.add('show');

        this.#parentElement.querySelector('.search-result').innerHTML = '';

        const markup = `
        <div class="preloader">
            <div class="spinner"></div>
        </div>`;

        this.#parentElement.querySelector('.search-result').insertAdjacentHTML('afterBegin', markup);
    }

    render(movies) {

        this.#parentElement.querySelector('.search-result').classList.add('show');

        this.#parentElement.querySelector('.search-result').innerHTML = '';

        movies.forEach(movie => {

            const markup = `
            <a class="result-item" data-id="${movie.id}">
                <div class="result-img">
                    <img src="${movie.image}" alt="Movie image">
                    <div class="preloader">
                        <div class="spinner"></div>
                    </div>
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

        this.hidePreloaders();
    }

    renderError(message) {

        this.#parentElement.querySelector('.search-result').classList.add('show');

        this.#errorMessage = message;

        const markup = `<span>${this.#errorMessage}</span>`;

        this.#parentElement.querySelector('.search-result').innerHTML = '';

        this.#parentElement.querySelector('.search-result').insertAdjacentHTML("afterbegin", markup);
    }

    searchHandler(handler) {

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

    selectMovieHandler(handler) {

        this.#parentElement.addEventListener('click', (e) => {

            const selectedMovie = e.target.closest('.result-item');

            if (!selectedMovie)
                return;

            this.#parentElement.querySelector('.search-result').classList.remove('show');

            this.#parentElement.querySelector('.search-field').value = '';

            handler(selectedMovie.dataset.id);
        });
    }

    hidePreloaders() {

        const imagesArray = [...this.#parentElement.querySelectorAll('.result-img img')];

        imagesArray.forEach(img => {

            img.addEventListener('load', (e) => {

                e.target.closest('.result-img').querySelector('.preloader').classList.add('hide');
            });
        });
    }

    init() {
        this.typeHandler();
        this.selectGenreHandler();
    }
}

export default new searchView();