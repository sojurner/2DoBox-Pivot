var title = $('.title-input');
var body = $('.body-input');
var ideaSection = $('.card-container');
var saveButton = $('.save-btn');
var numCards = 0;
var idByDate = Date.now();
var markedAsRead = $('.checked-btn');
var userInput = document.querySelector('.user-input');

function IdeaCard(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = idByDate;
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
    userInput.reset();
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var newCard = new IdeaCard(title.val(), body.val(), idByDate, null);
    localStorage.setItem(idByDate, JSON.stringify(newCard)) ; 
    generateCard(newCard); 
});

// Event Listeners
$('.container-box').on('click', '.delete-btn', removeCard);
$('.container-box').on('click', '.checked-btn', completedTask);

function removeCard() {
  if ($(this).hasClass('delete-btn')) {
    $(this).parents('.card-content').remove();
  }
  localStorage.removeItem($(this).parents('.card-container').attr('id'));
}

function completedTask(){
    $(this).parent().toggleClass("marked-as-read")
};


$('.user-input').on('input', (title, body), function() {
      if (title.val() === "" || body.val() === "") {
        saveButton.prop('disabled', true);
    } else {
        saveButton.prop('disabled', false);
    }
});

$(window).on('load', function () {
    for(var i = 0; i<localStorage.length; i++) {
        var retrieveFromLocalStorage = localStorage.getItem(localStorage.key(i))
        var parsedLocalStorageData = JSON.parse(retrieveFromLocalStorage);
        generateCard(parsedLocalStorageData);
    }
});

//     var cardData = JSON.parse(this);
// JavascriptEdit
//     $(".bottom-box").prepend(newCard());
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('')
// }


// // refactor. no nested if statements
// 
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

//     
// };








