var title = $('.title-input');
var body = $('.body-input');
var ideaSection = $('.card-container');
var numCards = 0;

function IdeaCard(id, title, body, quality) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = quality || "swill"
}

function generateCard(idea) {
    var createCard =
        `<div id="${idea.id}" class="card-container">
        <h2 class="title-of-card"> ${idea.title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card">
        "${idea.body}"</p>
        <button class="upvote"></button>
        <button class="downvote"></button> 
        <p class="quality">quality:<span class="qualityVariable">${idea.quality}</span></p>
        <hr>
        </div>`;
    ideaSection.after(createCard);
    console.log('Hello')
}

// $.(window)each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
// JavascriptEdit
//      (cardData.title, cardData.body, cardData.quality
//     $(".bottom-box").prepend(newCard());
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('')
// }


$('.save-btn').on('click', function(event) {
    event.preventDefault();
    // console.log("save")
    // if ($('#title-input').val() === "" || $('#body-input').val() === "") {
    //     $(this).prop('disabled', true);
    // } else {
    //     $(this).prop('disabled', false);
    // }
    var id = Date.now()
    var newCard = new IdeaCard(title.val(), body.val(), id, null);
    generateCard(newCard); 
});

// // refactor. no nested if statements
// $(".bottom-box").on('click', function(event){
//     var qualityArray = ['swill', 'plausible', 'genius']
//     var currentQuality = $(this).closest('.card-container').find(".qualityVariable")
//     var qualityArrayIndex = qualityArray.indexOf(currentQuality.text)
//     if ($(this).className === "upvote" || $(this).className === "downvote"){

//         if ($(this).className === "upvote" && qualityArrayIndex < 4) {
//             currentQuality

        
//     var cardHTML = $(this).closest('.card-container').attr('id');
//     var cardObjectInJSON = localStorage.getItem(cardHTML);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);
//     var changeQuality = qualityVariable.text;
//     cardObjectInJS.quality = changeQuality;
//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTML, newCardJSON);
//     }

//     else if ($(this).className === "delete-button") {
//         var cardHTML = $(this).closest('.card-container');
//         cardHTML.remove();
//         localStorage.removeItem(cardHTML.attr(id));
//     }
// };
      








