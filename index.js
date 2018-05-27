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
        <p class="todo-rating">Importance: <span class="importanceVariable">${idea.quality}</span></p><button class="btn checked-btn" aria-label="The button for marking a todo as read"></button>
        <hr>
        </section>
        </li>`;
    ideaSection.prepend(createCard);
    $(.user-Input).reset();
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var newCard = new IdeaCard(title.val(), body.val(), idByDate, null);
    var idByDate = Date.now();
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
  var markedAsRead = $('.checked-btn');  
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

$(window).on('load', function () {
    if ($('.card-container').hasClass('.card-content')) {
        $('.card-container').hide();
    }
})

$('.container-box').on('click', ('.upvote-btn, .downvote-btn'), function() {
    console.log("hello")
    var importanceArray = ['none', 'low', 'normal', 'high', 'critical']
    var currentImportance = $(this).siblings('.importanceVariable')
    var importanceArrayIndex = importanceArray.indexOf(currentImportance.text())
        if ($(this).className === "upvote-btn" && importanceArrayIndex < 4) {
            importanceVariable.text = importanceArray[index + 1];
            console.log("hello")
        }
        if ($(this).className === "downvote-btn" && importanceArraIndex > -1) {
            currentVariable.text = importanceArray[index - 1];
        }
})

//         if ($(this).className === "upvote" && qualityArrayIndex < 4) {
//             currentQuality

//     var cardData = JSON.parse(this);
// JavascriptEdit
//     $(".bottom-box").prepend(newCard());
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('')
// }
     
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








