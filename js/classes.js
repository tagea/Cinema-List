
// класс для создания комментария к фильму, содержит
// сам комментарий, имя пользователя и оценку за фильм
class Comment{
    constructor( user, text, stars ){
        this.user = user;
        this.text = text;
        this.stars = stars;
    }
}
// главный класс, хранит все о фильме
class Film{
    constructor( name, categoryNumber, description, year, country, cover){
        this.name = name;   //имя фильма
        this.category = category[categoryNumber]; //категория фильма
        this.description = description; //описание фильма
        this.rating = 0;    //рейтинг фильма
        this.year = year;   //год выпуска
        this.country = country;
        this.cover = cover; //обложка
        this.comments = [];
    }
    //добавляем комментарий
    addComment(user, text, stars){
        this.comments.push( new Comment( user, text, stars ) );
        //при добавлении комментария к фильму, изменяется его рейтинг
        this.updateRating(stars);
    }
    //обновляем рейтинг фильма
    updateRating(ratingNamber){
        let commentCount = this.comments.length;
        //добавляем к рейтингу новое значение и пересчитываем
        this.rating = (this.rating*(commentCount-1) + Number(ratingNamber))/commentCount;
        this.rating = +this.rating.toFixed(1);// округляем значения

    }

}

