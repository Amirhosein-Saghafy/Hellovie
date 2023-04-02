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

        let actorsImagesSection = '';
        let relatedMoviesSection = '';

        if (movie.actorList.length !== 0) {

            let actorsImagesArray = [];

            movie.actorList.forEach(actor => {

                actorsImagesArray.push(`
                <div class="swiper-slide">
                    <div class="actor-image">
                        <img src="${actor.image}" alt="${actor.name}">
                    </div>
                    <div class="actor-name">
                        <h4>${actor.name}</h4>
                        <span>as</span>
                        <h4>${actor.asCharacter}</h4>
                    </div>
                </div>
                `);
            });

            actorsImagesSection = `
                <div class="movie-actors-images">
                    <div class="title">
                        <h2>Actors Images</h2>
                    </div>
                    <div class="swiper swiper1">
                        <div class="swiper-wrapper">
                            ${actorsImagesArray.join('')}
                        </div>
                        <div class="swiper-button-prev swiper-button-prev1"></div>
                        <div class="swiper-button-next swiper-button-next1"></div>
                    </div>
                </div>`;
        }

        if (movie.similars.length !== 0) {

            let relatedMoviesArray = [];
            let fillStarArray = [];

            movie.similars.forEach(similar => {

                if (similar.imDbRating) {

                    fillStarArray = [];

                    const imdbRating = Math.floor(Number(similar.imDbRating));

                    const fillStarNumber = Math.floor(imdbRating / 2);

                    for (let i = 0; i < fillStarNumber; i++) {

                        fillStarArray.push(`
                            <svg width="12" height="12" fill="#D9A61C">
                                    <use xlink:href="./icons/solid.svg#star" />
                                </svg>
                            `);
                    }
                }

                relatedMoviesArray.push(`
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
                                ${fillStarArray.join('')}
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
                    <div class="swiper swiper2">
                        <div class="swiper-wrapper">
                            ${relatedMoviesArray.join('')}
                        </div>
                        <div class="swiper-button-prev swiper-button-prev2"></div>
                        <div class="swiper-button-next swiper-button-next2"></div>
                    </div>
                </div >`;
        }

        let fillStarArray = [];

        if (movie.imDbRating) {

            fillStarArray = [];

            const imdbRating = Math.floor(Number(movie.imDbRating));

            const fillStarNumber = Math.floor(imdbRating / 2);

            for (let i = 0; i < fillStarNumber; i++) {

                fillStarArray.push(`
                    <svg width="12" height="12" fill="#D9A61C">
                            <use xlink:href="./icons/solid.svg#star" />
                        </svg>
                    `);
            }
        }

        const markup = `
            <div class="selected-movie">
                <div class="title">
                    <h2>Movie</h2>
                </div>
                <div class="movie-content">
                    <img src="${movie.image}" alt="">
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
                                ${fillStarArray.join('')}
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
                        ${actorsImagesSection}
                    </div>
                </div>
            </div>
            ${relatedMoviesSection} `;

        this.#parentElement.querySelector('.content').insertAdjacentHTML('afterbegin', markup);

        if (movie.similars.length !== 0)
            this.sliderHandler();
    }

    renderError(message) {

        this.#errorMessage = message;

        const markup = `<span>${this.#errorMessage}</span>`;

        this.#parentElement.querySelector('.content').innerHTML = '';

        this.#parentElement.querySelector('.content').insertAdjacentHTML("afterbegin", markup);
    }

    selectRelatedMovieHandler(handler) {

        this.#parentElement.addEventListener('click', function (e) {

            const sliderItem = e.target.closest('.swiper-slide');

            if (!sliderItem)
                return;

            handler(sliderItem.dataset.id);
        });
    }

    sliderHandler() {

        const swiper = new Swiper('.swiper1', {
            grabCursor: true,
            loop: true,
            slidesPerView: 3,
            speed: 400,
            spaceBetween: 75,

            navigation: {
                nextEl: '.swiper-button-next1',
                prevEl: '.swiper-button-prev1',
            },
        });

        const swiper2 = new Swiper('.swiper2', {
            grabCursor: true,
            loop: true,
            slidesPerView: 3,
            speed: 400,
            spaceBetween: 75,

            navigation: {
                nextEl: '.swiper-button-next2',
                prevEl: '.swiper-button-prev2',
            },
        });
    }
}

export default new searchView();