
function getFimByCategory(cat){
    let filmByCategory = [];
    if (cat === category[0]){// первый элемент в массиве категорий - это Все категории
        return films;
    }
    else{
        return filmByCategory = films.filter( element => element.category === cat );
    }
}

function getFilmByName(name) {
    let filmByName = [];
    name = name.toLowerCase();
    //выборка из массива фильма, содержащего введеное слово
    return filmByName = films.filter( element => element.name.toLowerCase().search(name) !== -1 );
}

function getFilmByRating( rat ) {
    let filmByRating = [];
    //выборка из массива фильма с рейтингом больше, чем переданное значение
    return filmByRating = films.filter( element => element.rating >= rat );

}

function createStringForStars(commStar) {
    if( commStar === 5){
        return commStar + " баллов";
    }
    else if ( commStar === 1 ){
        return commStar + " бал";
    }
    else{
        return commStar + " балла";
    }
}


function showComments(film) {
    const reviewList = document.querySelector(".review__list");
    reviewList.innerHTML = "";
    if (film.comments.length){
        for (let comm of film.comments){
            const commItem  = document.createElement("li");
            reviewList.appendChild(commItem);
            commItem.classList.add("review__item");
            //формируем правильное сочетания числительного и слова "баллов"
            const starStr = createStringForStars(comm.stars);
            commItem.innerHTML = `<div class="film-descr__review-author">${comm.user}<span class="film-descr__review-star">(${starStr})</span></div>
                                    <div class="film-descr__review-text">${comm.text}</div>`;
        }
    }
    else{
        reviewList.innerHTML = "<li>К этому фильму пока еще нет отзывов</li>";
    }
    const filmRate = document.querySelector(".stars");
    filmRate.innerText = film.rating;
}


function addCommentToFilm(film) {
    const reviewName = document.querySelector(".review-name");
    const reviewText = document.querySelector(".review-form__text");
    const reviewStar = document.querySelectorAll(".review-form__radio");

    let checkedStar = 0;
    //выбираем активную радиокнопку
    reviewStar.forEach( rad => { if (rad.checked) checkedStar = rad.value} );
    if (reviewName.value !== "" && reviewText.value !== ""){
        film.addComment(reviewName.value, reviewText.value, checkedStar);
        reviewName.value = "";
        reviewText.value = "";
        reviewStar[4].checked = true;
        showComments(film);
    }
}
function createAddReviewBtn(film, form) {
    const reviewBtn = document.createElement("input");
    reviewBtn.type = "button";
    reviewBtn.value = "Добавить отзыв";
    reviewBtn.classList.add("review-form__submit");
    form.appendChild(reviewBtn);
    reviewBtn.addEventListener("click", function () {
        addCommentToFilm(film);
    });
}
//открывает или закрывает окно с описанием фильма
function toggleFilmDescription(descrOpen) {
    const filmDescr = document.querySelector(".film-descr");
    if (descrOpen){
        filmDescr.style.display = "flex";
    }
    else{
        filmDescr.style.display = "none";
        const reviewBtn = document.querySelector(".review-form__submit");
        if (reviewBtn){
            reviewBtn.remove();
        }
    }
    //descrOpen ? filmDescr.style.display = "flex" : filmDescr.style.display = "none";
}
//формируем закрытие описания фильма
function createBtnToCloseDescr() {
    const filmDescr = document.querySelector(".film-descr");
    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "<img src='img/noun_Close_53235.svg' alt='Закрыть окно'>";
    filmDescr.insertBefore(closeBtn, filmDescr.childNodes[0]);

    closeBtn.addEventListener("click", function (){
        toggleFilmDescription(false);
    });
}

function showFilmDesciption( film ) {
    //получаем элементы описания фильма и заполняем их
    const filmTitle = document.querySelector(".film-descr__title");
    filmTitle.innerText = film.name;

    const filmAbout = document.querySelector(".film-descr__text");
    filmAbout.innerText = film.description;

    const filmCover = document.querySelector(".film-descr__cover");
    filmCover.style.backgroundImage = `url(${film.cover})`;

    const filmYear = document.querySelector(".film-descr__year-country");
    filmYear.innerHTML = `Год выпуска: ${film.year}. Страна производства: ${film.country}`;

    showComments(film);

    let reviewBtnIs = false;
    const reviewForm = document.querySelector(".review-form");
    if (!reviewBtnIs){
        createAddReviewBtn(film, reviewForm);
        createBtnToCloseDescr();
        reviewBtnIs = true;
    }
}

function createListFilm(filmArray) {
    const filmList = document.querySelector(".films__list");

    filmList.innerHTML = "";
    const sizeOfFilmArray = filmArray.length;
    if (sizeOfFilmArray > 0){
        for (let el of filmArray){
            const filmItem = document.createElement('li');
            filmList.appendChild(filmItem);
            filmItem.classList.add("films__items");
            filmItem.innerHTML = `<img src="${el.cover}" alt="${el.name}" class="films__cover">`;

            filmItem.addEventListener("click", function(){
                showFilmDesciption( el );
                toggleFilmDescription(true);
            });
        }
    }
    else{
        const filmItem = document.createElement('li');
        filmList.appendChild(filmItem);
        filmItem.innerHTML = "<div class='no-films'>К сожалению, фильмов по вашему запросу нет</div>";
    }
}

//отображает список фильмов
function createListFilmByCategory(cat) {
    const filmByCategory = getFimByCategory(cat);
    createListFilm(filmByCategory);
}
function createListFilmByRating(rat) {
    const filmByRating = getFilmByRating(rat);
    createListFilm(filmByRating);
}

function addActiveClass(el) {
    const activeEl = document.querySelector(".category__item_active");
    //добавляем к выбранной категории класс для активной ссылки
    if (activeEl){
        activeEl.classList.remove("category__item_active");
    }
    if( el ){
        el.classList.add("category__item_active");
    }
}
//создание кнопки из списка категорий
function createBtnCategory(){
    const categoryFilm = document.querySelectorAll(".category__item");
    categoryFilm.forEach( el => el.addEventListener("click", function () {
        createListFilmByCategory(el.children[0].innerText);
        addActiveClass(el);
        toggleFilmDescription(false);
    }));
}
//создание кнопки из списка рейтинга
function createBtnRating(){
    const ratingFilm = document.querySelectorAll(".rating__item");
    ratingFilm.forEach( el => el.addEventListener("click", function () {
        createListFilmByRating(Number(el.childNodes[1].innerText));
        addActiveClass(el);
        toggleFilmDescription(false);
    }));
}

//формирует список категорий на сайте
function createListCategories() {
    const catList = document.querySelector(".category__list");
    for (cat of category){
        const catItem = document.createElement('li');
        catList.appendChild(catItem);
        catItem.classList.add("category__item");
        const film = getFimByCategory(cat);
        catItem.innerHTML = `<div class='category__title'>${cat}</div><div class='category__qnt'>${film.length}</div>`;
    }
    catList.children[0].classList.add("category__item_active");
    createBtnCategory();
    createListFilmByCategory(category[0]);
}

function createRatingList(){
    const ratList = document.querySelector(".rating__list");
    let n = 5;
    while (n > 0 ) {
        const ratItem = document.createElement('li');
        ratList.appendChild(ratItem);
        ratItem.classList.add("rating__item");
        ratItem.innerHTML = `Фильмы с баллом больше <b>${n}</b>`;
        n--;
    }
    createBtnRating();
}

function searchFilm(){
    const searchForm = document.querySelector(".search__input");
    const searchFormLabel = document.querySelector(".search__label");
    const searchFormBtn = document.querySelector(".search__submit");
    
    searchFormBtn.addEventListener("click", function () {
        if (searchForm.value !== ""){
            const filmByName = getFilmByName(searchForm.value);
            createListFilm(filmByName);
            addActiveClass();
            toggleFilmDescription(false);
        }
    });

    searchForm.addEventListener("change", function () {
        if (searchForm.value !== ""){
            searchFormLabel.innerText="";
        } 
        else{
            searchFormLabel.innerText="Найти название фильма";
        }   
    });

}

document.addEventListener("DOMContentLoaded", createListCategories);
document.addEventListener("DOMContentLoaded", createRatingList);
document.addEventListener("DOMContentLoaded", searchFilm);


