var title = $('.title-input');
var body = $('.body-input');
var ideaSection = $('.card-container');
var saveButton = $('.save-btn');
var numCards = 0;

function IdeaCard(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = quality || "Normal"
}

function generateCard(idea) {
    var createCard =
        `<li id="${idea.id}" class="card-container">
        <section class="card-content">
        <h2 class="card-title"> ${idea.title}</h2>
        <button class="btn delete-btn" aria-label="Button for deleting a to-do"></button>
        <p class="card-body">
        "${idea.body}"</p>
        <button class="btn upvote-btn" aria-label="Button for upvoting a to-do"></button>
        <button class="btn downvote-btn" aria-label="Button for downvoting a to-do"></button> 
        <p class="todo-rating">Importance: <span class="qualityVariable">${idea.quality}</span></p><button class="btn checked-btn" aria-label="The button for marking a todo as read"></button>
        <hr>
        </section>
        </li>`;
    ideaSection.prepend(createCard);
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
    var id = Date.now()
    var newCard = new IdeaCard(title.val(), body.val(), id, null);
    generateCard(newCard); 
});

$('.user-input').on('input', (title, body), function() {
      if (title.val() === "" || body.val() === "") {
        saveButton.prop('disabled', true);
    } else {
        saveButton.prop('disabled', false);
    }
})

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
      








