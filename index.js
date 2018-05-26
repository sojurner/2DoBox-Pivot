var title = $('#title-input').val();
var body = $('#body-input').val();
var numCards = 0;

function IdeaCard(id, title, body, quality);
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || "swill"

var newCard = function(idea) {
    `<div id="${idea.id}" class="card-container"><h2 class="title-of-card">  
    title</h2>
    <button class="delete-button"></button>
    <p class="body-of-card">
    "${idea.body}"</p>
    <button class="upvote"></button>
    <button class="downvote"></button> 
    <p class="quality">quality:<span class="qualityVariable">quality</span> </p>
    <hr>
    </div>`;
};

function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality: qualityVariable
    };
}

$.each(localStorage, function(key) {
    var cardData = JSON.parse(this);
    numCards++;
    $(".bottom-box").prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
});

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
        $(this).prop(disabled, true);
    } else {
        $(this).prop(disabled, false);
    }
    var CreateCard = new IdeaCard(title.val(), body.val(), qualityVariable); 
    localStoreCard();
    $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
    var currentQuality = $(this.parents('p.quality').children()[0]).text();
    var qualityVariable;

    if ($(this).className === "upvote" || $(this).className === "downvote"){

        if ($(this).className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(this).closest('.card-container').attr('id');
    var cardObjectInJSON = localStorage.getItem(cardHTML);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);
    var changeQuality = qualityVariable.text;
    cardObjectInJS.quality = changeQuality;
    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTML, newCardJSON);
    }

    else if ($(this).className === "delete-button") {
        var cardHTML = $(this).closest('.card-container');
        cardHTML.remove();
        localStorage.removeItem(cardHTML.attr(id));
    }
});
      








