import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'

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

        let relatedMoviesSection = '';

        if (movie.similars.length !== 0) {

            let relatedMovies = [];

            movie.similars.forEach(similar => {

                relatedMovies.push(`
                <div class="swiper-slide" data-id="${similar.id}">
                    <div class="movie-img">
                        <img src="${similar.image}" alt="movie poster">
                    </div>
                    <div class="movie-details">
                        <div class="movie-header">
                            <div class="movie-title">
                                <h4>${similar.title}</h4>
                            </div>
                        <div class="movie-rate">
                            <span>${similar.imDbRating || 'Unknown'}</span>
                            <div class="stars">
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/regular.svg#star" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
            });

            relatedMoviesSection = `
                <div class="related-movies">
                    <div class="title">
                        <h2>Related Movies</h2>
                    </div>
                    <div class="swiper">
                        <div class="swiper-wrapper">
                            ${relatedMovies}
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div >`;

            this.sliderHandler();
        }

        const markup = `
            <div class="selected-movie">
                <div class="title">
                    <h2>Movie</h2>
                </div>
                <div class="movie-poster">
                    <img src="${movie.image}" alt="">
                </div>
                <div class="movie-details">
                    <div class="movie-header">
                        <div class="movie-title">
                            <h4>${movie.title}</h4>
                        </div>
                        <div class="movie-rate">
                            <span>${movie.imDbRating || 'Unknown'}</span>
                            <div class="stars">
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                                <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/regular.svg#star" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="movie-body">
                        <div class="movie-realase">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./icons/solid.svg#film" />
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
                                <use xlink:href="./icons/regular.svg#menu" />
                            </svg>
                            <span>${movie.genres || 'Unknown'}</span>
                        </div>
                        <div class="movie-duration">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./icons/regular.svg#clock" />
                            </svg>
                            <span>${movie.runtimeStr || 'Unknown'}</span>
                        </div>
                        <div class="movie-languages">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./icons/solid.svg#language" />
                            </svg>
                            <span>Languages :</span>
                            <span>${movie.languages || 'Unknown'}</span>
                        </div>
                        <div class="metacritic">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./icons/solid.svg#m" />
                            </svg>
                            <span>Metacritic :</span>
                            <span>${movie.metacriticRating || 'Unknown'}</span>
                        </div>
                        <div class="movie-crew">
                            <div class="directors">
                                <svg width="18" height="18" fill="#F6EFF0">
                                    <use xlink:href="./icons/solid.svg#clapperboard" />
                                </svg>
                                <label>Directors :</label>
                                <span>${movie.directors || 'Unknown'}</span>
                            </div>
                            <div class="writers">
                                <svg width="18" height="18" fill="#F6EFF0">
                                    <use xlink:href="./icons/solid.svg#pen-to-square" />
                                </svg>
                                <label>Writers :</label>
                                <span>${movie.writers || 'Unknown'}</span>
                            </div>
                            <div class="stars">
                                <svg width="18" height="18" fill="#F6EFF0">
                                    <use xlink:href="./icons/solid.svg#people-group" />
                                </svg>
                                <label>Stars :</label>
                                <span>${movie.stars || 'Unknown'}</span>
                            </div>
                        </div>
                        <div class="movie-description">
                            <svg width="18" height="18" fill="#F6EFF0">
                                <use xlink:href="./icons/regular.svg#chart-bar"></use>
                            </svg>
                            <span>Story : </span>
                            <p>
                            ${movie.plot || 'Unknown'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            ${relatedMoviesSection} `;

        this.#parentElement.querySelector('.content').insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message) {

        this.#errorMessage = message;

        const markup = `<span>${this.#errorMessage}</span>`;

        this.#parentElement.querySelector('.content').innerHTML = '';

        this.#parentElement.querySelector('.content').insertAdjacentHTML("afterbegin", markup);
    }

    selectRelatedMovieHandler(handler) {

        this.#parentElement.addEventListener('click', function (e) {

            const sliderItem = e.target.closest('.movie-item');

            if (!sliderItem)
                return;

            handler(sliderItem.dataset.id);
        });
    }

    sliderHandler() {

        const swiper = new Swiper('.swiper', {
            grabCursor: true,
            loop: true,
            slidesPerView: 3,
            spaceBetween: 300,
            speed: 400,
            spaceBetween: 100,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        const swiperProp = this.#parentElement.querySelector('.swiper').swiper;

        console.log(swiperProp);
    }
}

export default new searchView();