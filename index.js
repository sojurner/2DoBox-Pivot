function IdeaCard(title, body, id, importance) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.importance = importance || 'Normal';
    // this.read = read;
}

IdeaCard.prototype.read = function() {
    if($('li').hasClass('marked-as-read')) {
        this.read = true
        .hide()
    } else{this.read = false}
}

function generateCard(idea) {
    var createCard =
        `<li id="${idea.id}" class="card-container">
            <section class="card-content">
                <h2 class="card-title"> ${idea.title}</h2>
                <button class="btn delete-btn" aria-label="Button for deleting a to-do"></button>
                <p class="card-body">"${idea.body}"</p>
                <button class="btn upvote-btn" aria-label="Button for upvoting a to-do"></button>
                <button class="btn downvote-btn" aria-label="Button for downvoting a to-do"></button> 
                <p class="todo-rating">Importance: <span class="importance-quality">${idea.importance}</span></p>
                <button class="btn checked-btn" aria-label="The button for marking a todo as read"></button>
                <hr>
            </section>
        </li>`;
    $('.card-container').prepend(createCard);
    // $('.user-input').reset();
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var newCard = new IdeaCard($('.title-input').val(), $('.body-input').val(), idByDate, null, false);
    var idByDate = Date.now();
    localStorage.setItem(idByDate, JSON.stringify(newCard)) ; 
    generateCard(newCard); 
});

// Event Listeners
$('.container-box').on('click', '.delete-btn', removeCard);
$('.container-box').on('click', '.checked-btn', completedTask);

function removeCard() {
  if ($(this).hasClass('delete-btn')) {
    $(this).parents('.card-container').remove();
  }
  localStorage.removeItem($(this).parents('.card-container').attr('id'));
}

function completedTask(){
  var markedAsRead = $('.checked-btn');  
  $(this).parent().toggleClass("marked-as-read")
};

$('.user-input').on('input', ('.title-input, .body-input'), function() {
      if ($('.title-input').val() === "" || $('.body-input').val === "") {
        $('.save-btn').prop('disabled', true);
    } else {
        $('.save-btn').prop('disabled', false);
    }
});

$(window).on('load', function () {
    for(var i = 0; i<localStorage.length; i++) {
        var retrieveFromLocalStorage = localStorage.getItem(localStorage.key(i))
        var parsedLocalStorageData = JSON.parse(retrieveFromLocalStorage);
        generateCard(parsedLocalStorageData);
    }
})

$('.container-box').on('click', ('.upvote-btn, .downvote-btn'), function() {
    var importanceArray = ['None', 'Low', 'Normal', 'High', 'Critical']
    var currentImportance = $(this).closest('section').find('.importance-quality');
    var arrayIndex = importanceArray.indexOf(currentImportance.text());
        if ($(this).attr('class') === "btn upvote-btn" && arrayIndex < 4) {
            currentImportance.text(importanceArray[arrayIndex + 1]);
            console.log(arrayIndex)
        } else if ($(this).attr('class') === "btn downvote-btn" && arrayIndex > -1) {
            currentImportance.text(importanceArray[arrayIndex - 1]);
        }
//     var id = $(this).closest('article').attr('id')
//     var parsedFromLocalStorage = JSON.parse(localStorage.getItem(id));
//     parsedFromLocalStorage.importance = currentImportance.text(importanceArray[arrayIndex]);
//     var setObject = localStorage.setItem(id, JSON.stringify(parseObjectFromLocalStorage));
 })

$('.search-ideas').on('keyup', arrayFromLocalStorage)

function arrayFromLocalStorage() {
  var newArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
  };
  filterSearch(newArray);
};

// Persisting Edits on Card
//     var cardHTML = $(this).closest('.card-container').attr('id');
//     var cardObjectInJSON = localStorage.getItem(cardHTML);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);
//     var changeQuality = qualityVariable.text;
//     cardObjectInJS.quality = changeQuality;
//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTML, newCardJSON);










