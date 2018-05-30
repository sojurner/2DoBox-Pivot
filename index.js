function IdeaCard(title, body, id, importance) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.importance = importance || 'Normal';
    this.read = false;
}

function generateCard(idea) {
    var createCard =
        `<section id="${idea.id}" class="card-content">
                <h2 class="card-title" contenteditable="true"> ${idea.title}</h2>
                <button class="btn delete-btn" aria-label="Button for deleting a to-do"></button>
                <p class="card-body" contenteditable="true">"${idea.body}"</p>
                <button class="btn upvote-btn" aria-label="Button for upvoting a to-do"></button>
                <button class="btn downvote-btn" aria-label="Button for downvoting a to-do"></button> 
                <p class="todo-rating">Importance: <span class="importance-quality">${idea.importance}</span></p>
                <button class="btn checked-btn" aria-label="The button for marking a todo as read"></button>
                <hr>
            </section>`;
    $('.card-container').prepend(createCard);
}

$('.save-btn').on('click', generateCardObject)

function generateCardObject(event) {
    event.preventDefault();
    var newCard = new IdeaCard($('.title-input').val(), $('.body-input').val(), idByDate, null, false);
    var idByDate = Date.now();
    localStorage.setItem(idByDate, JSON.stringify(newCard)); 
    clearInputFields()
    generateCard(newCard); 
}

function clearInputFields() {
    $('.title-input').val('');
    $('.body-input').val('');
    $('.title-input').focus();
}

$('.container-box').on('click', '.delete-btn', removeCard);

function removeCard() {
  if ($(this).hasClass('delete-btn')) {
    $(this).parents('.card-content').remove();
  }
  localStorage.removeItem($(this).parents('.card-content').attr('id'));
}

$('.container-box').on('click', '.checked-btn', markedTask);

function markedTask(object){
    object.read = !object.read; 
    $(this).parent().toggleClass("marked-as-read");
    var readMark = $(this).closest('.card-content').attr('id');
    var cardfromStorage = JSON.parse(localStorage.getItem(readMark));
    cardfromStorage.read = !(cardfromStorage.read);
    var sendToLocalStorage = localStorage.setItem(readMark, JSON.stringify(cardfromStorage));
}


$('.user-input').on('input', ('.title-input, .body-input'), enableDisableSaveButton);

function enableDisableSaveButton() {
      if ($('.title-input').val() === '' || $('.body-input').val === '') {
        $('.save-btn').prop('disabled', true);
    } else {
        $('.save-btn').prop('disabled', false);
    }   
}

$(window).on('load', persisitLocalStorage);
    
function persisitLocalStorage() {
    for(var i = 0; i<localStorage.length; i++) {
        var retrieveFromLocalStorage = localStorage.getItem(localStorage.key(i));
        var parsedLocalStorageData = JSON.parse(retrieveFromLocalStorage);
        if (parsedLocalStorageData.read === false) {
            generateCard(parsedLocalStorageData); 
        }
    }
}

$('.container-box').on('click', ('.upvote-btn, .downvote-btn'), importanceQualityEdit);

function importanceQualityEdit () {
    var importanceArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var currentImportance = $(this).closest('section').find('.importance-quality');
    var arrayIndex = importanceArray.indexOf(currentImportance.text());
        if ($(this).attr('class') === 'btn upvote-btn' && arrayIndex <= 3) {
            currentImportance.text(importanceArray[arrayIndex + 1]);
        } 
        if ($(this).attr('class') === 'btn downvote-btn' && arrayIndex >= 1) {
            currentImportance.text(importanceArray[arrayIndex - 1]);
        }
    var id = $(this).closest('.card-content').attr('id');
    var parsedFromLocalStorage = JSON.parse(localStorage.getItem(id));
    parsedFromLocalStorage.importance = currentImportance.text();
    var setObject = localStorage.setItem(id, JSON.stringify(parsedFromLocalStorage));
}

$('.search-ideas').on('keyup', listFilter);

function listFilter(search) {
  var rawSearchInput = $('.search-ideas').val();
  var search = rawSearchInput.trim();
  $.extend($.expr[":"], {
    'contains': function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
    }
  });
    $('h2:contains(' + search + ')').closest('.card-content').show();
    $('h2:not(:contains(' + search + '))').closest('.card-content').hide();
    $('p:contains(' + search + ')').closest('.card-content').show();  
}

$('.container-box').on('blur', ('.card-title, .card-body'), updateUserEdit);

function updateUserEdit() {
    var id = $(this).closest('section').attr('id');
    var parsedFromLocalStorage = JSON.parse(localStorage.getItem(id));
    parsedFromLocalStorage.title = $(this).text();
    parsedFromLocalStorage.body = $(this).text();
    sendStringifyStorage = localStorage.setItem(id, JSON.stringify(parsedFromLocalStorage));
}

$('.show-menu-btn').on('click', toggleMenuExpansion); 

function toggleMenuExpansion() {
    $('#bunch-of-btns').toggleClass('show-expanded-menu');
}

$('.show-completed').on('click', showMarkedRead);

function showMarkedRead() {
    for(var i = 0; i<localStorage.length; i++) {
        var retrieveFromLocalStorage = localStorage.getItem(localStorage.key(i));
        var parsedLocalStorageData = JSON.parse(retrieveFromLocalStorage);
        if (parsedLocalStorageData.read === true) {
            generateCard(parsedLocalStorageData);
        }
    }
    $('.show-completed').prop('disabled', true);    
}