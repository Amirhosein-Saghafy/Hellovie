class searchView {

    #errorMessage = ``;
    #parentElement = document.querySelector('.movie');

    renderLoading() {

        this.#parentElement.querySelector('.content').innerHTML = '';

        const markup = `
        <div class="preloader">
            <div class="spinner"></div>
        </div>`;

        this.#parentElement.querySelector('.content').insertAdjacentHTML('afterBegin', markup);
    }

    render(movie) {

        this.#parentElement.querySelector('.content').innerHTML = '';

        const markup = `
            <div class="selected-movie">
                <div class="title">
                    <h2>Movie</h2>
                </div>
                <div class="movie-content">
                    <div class="image-container">
                        <img src="${movie.image}" alt="">
                        <div class="preloader">
                            <div class="spinner"></div>
                        </div>
                    </div>
                    <iframe src="https://www.2embed.to/embed/imdb/movie?id=${movie.id}" type="video" ></iframe>
                </div>
                <div class="movie-details">
                    <div class="movie-header">
                        <div class="movie-title">
                            <h4>${movie.title}</h4>
                        </div>
                        <div class="movie-rate">
                            <span>${movie.imDbRating || 'Unknown'}</span>
                            <div class="stars">
                                ${(movie.imDbRating ? this.calculateStar(movie.imDbRating) : '')}
                            </div>
                        </div>
                    </div>
                    <div class="movie-body">
                        <div class="movie-realase">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./solid.c6c386c0.svg#film" />
                            </svg>
                            <div class="movie-type">
                                <span>${movie.type || 'Unknown'}</span>
                            </div>
                            <div class="movie-year">
                                <span>${movie.year || 'Unknown'}</span>
                            </div>
                        </div>
                        <div class="movie-genres">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./regular.13f8d743.svg#menu" />
                            </svg>
                            <span>${movie.genres || 'Unknown'}</span>
                        </div>
                        <div class="movie-duration">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./regular.13f8d743.svg#clock" />
                            </svg>
                            <span>${movie.runtimeStr || 'Unknown'}</span>
                        </div>
                        <div class="movie-languages">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./solid.c6c386c0.svg#language" />
                            </svg>
                            <span>Languages :</span>
                            <span>${movie.languages || 'Unknown'}</span>
                        </div>
                        <div class="metacritic">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./solid.c6c386c0.svg#m" />
                            </svg>
                            <span>Metacritic :</span>
                            <span>${movie.metacriticRating || 'Unknown'}</span>
                        </div>
                        <div class="movie-crew">
                            <div class="directors">
                                <svg width="18" height="18" fill="#F6EFF0">
                                    <use xlink:href="./solid.c6c386c0.svg#clapperboard" />
                                </svg>
                                <label>Directors :</label>
                                <span>${movie.directors || 'Unknown'}</span>
                            </div>
                            <div class="writers">
                                <svg width="18" height="18" fill="#F6EFF0">
                                    <use xlink:href="./solid.c6c386c0.svg#pen-to-square" />
                                </svg>
                                <label>Writers :</label>
                                <span>${movie.writers || 'Unknown'}</span>
                            </div>
                            <div class="stars">
                                <svg width="18" height="18" fill="#F6EFF0">
                                    <use xlink:href="./solid.c6c386c0.svg#people-group" />
                                </svg>
                                <label>Stars :</label>
                                <span>${movie.stars || 'Unknown'}</span>
                            </div>
                        </div>
                        <div class="movie-description">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./regular.13f8d743.svg#chart-bar"></use>
                            </svg>
                            <span>Story : </span>
                            <p>
                            ${movie.plot || 'Unknown'}
                            </p>
                        </div>
                        ${(movie.actorList.length > 0 ? this.renderActorsList(movie.actorList) : '')}
                    </div>
                </div>
            </div>
            ${(movie.similars.length > 0 ? this.renderSimilarMovies(movie.similars) : '')} `;

        this.#parentElement.querySelector('.content').insertAdjacentHTML('afterbegin', markup);

        if (movie.actorList.length > 0) {
            if (movie.actorList.length >= 6)
                this.sliderHandler('actorsList', true);
            else
                this.sliderHandler('actorsList', false);
        }

        if (movie.similars.length > 0) {
            if (movie.similars.length >= 6)
                this.sliderHandler('similarMovies', true);
            else
                this.sliderHandler('similarMovies', false);
        }

        this.hidePreloaders();
    }

    renderError(message) {

        this.#errorMessage = message;

        const markup = `<span>${this.#errorMessage}</span>`;

        this.#parentElement.querySelector('.content').innerHTML = '';

        this.#parentElement.querySelector('.content').insertAdjacentHTML("afterbegin", markup);
    }

    renderActorsList(actorList) {

        let actorsListSection = '';
        let actorsArray = [];

        actorList.forEach(actor => {

            actorsArray.push(`
            <div class="swiper-slide">
                <div class="image-container">
                    <img src="${actor.image}" alt="${actor.name}">
                    <div class="preloader">
                        <div class="spinner"></div>
                    </div>
                </div>
                <div class="actor-name">
                    <h4>${actor.name}</h4>
                    <span>as</span>
                    <h4>${actor.asCharacter}</h4>
                </div>
            </div>
            `);
        });

        actorsListSection = `
            <div class="movie-actors-images">
                <div class="title">
                    <h2>Actors Images</h2>
                </div>
                <div class="swiper swiper1">
                    <div class="swiper-wrapper">
                        ${actorsArray.join('')}
                    </div>
                    <div class="swiper-button-prev swiper-button-prev1"></div>
                    <div class="swiper-button-next swiper-button-next1"></div>
                </div>
            </div>`;

        return actorsListSection;
    }

    renderSimilarMovies(similars) {

        let similarMoviesSection = '';
        let similarMoviesArray = [];

        similars.forEach(similar => {

            similarMoviesArray.push(`
            <div class="swiper-slide movie-slide" data-id="${similar.id}">
                <div class="image-container">
                    <img src="${similar.image}" alt="movie poster">
                    <div class="preloader">
                        <div class="spinner"></div> 
                    </div>
                </div>
                <div class="movie-details">
                    <div class="movie-header">
                        <div class="movie-title">
                            <h4>${similar.title}</h4>
                        </div>
                    <div class="movie-rate">
                        <span>${similar.imDbRating || 'Unknown'}</span>
                        <div class="stars">
                            ${(similar.imDbRating ? this.calculateStar(similar.imDbRating) : '')}
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
        });

        similarMoviesSection = `
            <div class="similar-movies">
                <div class="title">
                    <h2>Similar Movies</h2>
                </div>
                <div class="swiper swiper2">
                    <div class="swiper-wrapper">
                        ${similarMoviesArray.join('')}
                    </div>
                    <div class="swiper-button-prev swiper-button-prev2"></div>
                    <div class="swiper-button-next swiper-button-next2"></div>
                </div>
            </div >`;

        return similarMoviesSection;
    }

    hidePreloaders() {

        const imagesArray = [];

        imagesArray.push(this.#parentElement.querySelector('.movie-content > .image-container img'));

        imagesArray.push(...this.#parentElement.querySelectorAll('.movie-actors-images .image-container img'));

        imagesArray.push(...this.#parentElement.querySelectorAll('.similar-movies .image-container img'));

        imagesArray.forEach(img => {

            img.addEventListener('load', (e) => {
                e.target.closest('.image-container').querySelector('.preloader').classList.add('hide');
            });
        });
    }

    calculateStar(imDbRating) {

        let fillStarArray = [];

        const imdbRating = Math.floor(Number(imDbRating));

        const fillStarNumber = Math.floor(imdbRating / 2);

        for (let i = 0; i < fillStarNumber; i++) {

            fillStarArray.push(`
                <svg width="12" height="12" fill="#D9A61C">
                    <use xlink:href="./solid.c6c386c0.svg#star" />
                </svg>
                `);
        }

        return fillStarArray.join('');

    }

    selectRelatedMovieHandler(handler) {

        this.#parentElement.addEventListener('click', function (e) {

            const movieItem = e.target.closest('.movie-slide');

            if (!movieItem)
                return;

            handler(movieItem.dataset.id);
        });
    }

    sliderHandler(id, loop) {

        switch (id) {

            case 'actorsList':
                const swiper = new Swiper('.swiper1', {
                    grabCursor: true,
                    loop,
                    slidesPerView: 1,
                    speed: 400,
                    spaceBetween: 20,
                    width: 350,

                    navigation: {
                        nextEl: '.swiper-button-next1',
                        prevEl: '.swiper-button-prev1',
                    },

                    breakpoints: {

                        768: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                            width: null,
                        },

                        992: {
                            slidesPerView: 3,
                            spaceBetween: 75,
                            width: null,
                        }
                    }
                });
                break;

            case 'similarMovies':
                const swiper2 = new Swiper('.swiper2', {
                    grabCursor: true,
                    loop,
                    slidesPerView: 1,
                    speed: 400,
                    spaceBetween: 20,
                    width: 350,

                    navigation: {
                        nextEl: '.swiper-button-next2',
                        prevEl: '.swiper-button-prev2',
                    },

                    breakpoints: {

                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            width: null,
                        },

                        992: {
                            slidesPerView: 3,
                            spaceBetween: 75,
                            width: null,
                        }
                    }
                });
                break;

        }
    }
}

export default new searchView();