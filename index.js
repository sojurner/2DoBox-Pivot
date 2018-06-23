function IdeaCard(title, body, id, importance) {
    this.title = title;
    this.body = body;
    this.id = id;
    this.importance = importance || 'Normal';
    this.read = false;
}

$('.save-btn').on('click', generateCardObject)

function generateCardObject(event) {
    event.preventDefault();
    var idByDate = Date.now();
    var newCard = new IdeaCard($('.title-input').val(), $('.body-input').val(), idByDate, null, false);
    localStorage.setItem(idByDate, JSON.stringify(newCard)); 
    clearInputFields();
    generateCard(newCard); 
}

function generateCard(toDo) {
    var createCard =
        `<section id="${toDo.id}" class="card-content fade-in">
                <h2 class="card-title" contenteditable="true"> ${toDo.title}</h2>
                <button class="btn delete-btn" aria-label="Button for deleting a to-do"></button>
                <p class="card-body" contenteditable="true">${toDo.body}</p>
                <button class="btn upvote-btn" aria-label="Button for upvoting a to-do"></button>
                <button class="btn downvote-btn" aria-label="Button for downvoting a to-do"></button> 
                <p class="todo-rating">Importance : <span class="importance-quality">${toDo.importance}</span></p>
                <button class="btn checked-btn" aria-label="The button for marking a todo as read"></button>
                <i class="fab fa-readme"></i>
                <hr>
            </section>`;
    $('.card-container').prepend(createCard);
}

function clearInputFields() {
    $('.title-input').val('');
    $('.body-input').val('');
    $('.title-input').focus();
}

$('.container-box').on('click', '.delete-btn', removeCard);

function removeCard() {
    var cardToRemove = $(this).parents('.card-content');
    cardToRemove.fadeOut(500);
    localStorage.removeItem(cardToRemove.attr('id'));
}

$('.container-box').on('click', '.checked-btn', markedTask);

function markedTask(object){
    $(this).siblings().toggleClass('show');
    var readMark = $(this).closest('.card-content').attr('id');
    var cardfromStorage = JSON.parse(localStorage.getItem(readMark));
    cardfromStorage.read = !cardfromStorage.read;
    var sendToLocalStorage = localStorage.setItem(readMark, JSON.stringify(cardfromStorage));
}

$('.user-input').on('input', ('.title-input, .body-input'), enableDisableSaveButton);

function enableDisableSaveButton(event) {
    event.preventDefault()
    $('.title-input').val() === '' || $('.body-input').val() === '' ? $('.save-btn').prop('disabled', true) : $('.save-btn').prop('disabled', false);   
}

$(window).on('load', persisitLocalStorage);
    
function persisitLocalStorage() {
    for(var i = 0; i<localStorage.length; i++) {
        var retrieveFromLocalStorage = localStorage.getItem(localStorage.key(i));
        var parsedLocalStorageData = JSON.parse(retrieveFromLocalStorage);
        parsedLocalStorageData.read === false ? generateCard(parsedLocalStorageData) : false;
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
  var search = $('.search-ideas').val().trim();
  $.extend($.expr[":"], {
    'contains': function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
    }
  });
    $('h2:contains(' + search + ')').closest('.card-content').show();
    $('h2:not(:contains(' + search + '))').closest('.card-content').hide();
    $('p:contains(' + search + ')').closest('.card-content').show();  
}

$('.container-box').on('blur', ('.card-title'), editTitle);

function editTitle() {
    var id = $(this).closest('section').attr('id');
    var parsedFromLocalStorage = JSON.parse(localStorage.getItem(id));
    parsedFromLocalStorage.title = $(this).text();
    localStorage.setItem(id, JSON.stringify(parsedFromLocalStorage));
}

$('.container-box').on('blur', ('.card-body'), editBody);

function editBody() {
    var id = $(this).closest('section').attr('id');
    var parsedFromLocalStorage = JSON.parse(localStorage.getItem(id));
    parsedFromLocalStorage.body = $(this).text();
    localStorage.setItem(id, JSON.stringify(parsedFromLocalStorage));
}

$('.show-menu-btn').on('click', toggleMenuExpansion); 

function toggleMenuExpansion() {
    $('#bunch-of-btns').toggleClass('hide');
}

$('.show-completed').on('click', showMarkedRead);
$('.critical-importance').on('click', showMarkedRead);
$('.high-importance').on('click', showMarkedRead);
$('.neautral-importance').on('click', showMarkedRead);
$('.low-importance').on('click', showMarkedRead);
$('.least-importance').on('click', showMarkedRead);
$('.show-all').on('click', showMarkedRead);

function showMarkedRead() {
    $('.card-container').empty()
    for(var i = 0; i<localStorage.length; i++) {
        var retrieveFromLocalStorage = localStorage.getItem(localStorage.key(i));
        var parsedLocalStorageData = JSON.parse(retrieveFromLocalStorage);
        if($(this).hasClass('show-completed')) {
            $('.show-completed').prop('disabled', true)    
            parsedLocalStorageData.read === true ? generateCard(parsedLocalStorageData) : false;
        }else if($(this).hasClass('least-importance')) {
            parsedLocalStorageData.importance === "None" ? generateCard(parsedLocalStorageData) : false;
        }else if($(this).hasClass('low-importance')) {
            parsedLocalStorageData.importance === "Low" ? generateCard(parsedLocalStorageData) : false;
        }else if($(this).hasClass('neautral-importance')) {
            parsedLocalStorageData.importance === "Normal" ? generateCard(parsedLocalStorageData) : false;
        }else if($(this).hasClass('high-importance')) {
            parsedLocalStorageData.importance === "High" ? generateCard(parsedLocalStorageData) : false;       
        }else if($(this).hasClass('critical-importance')) {
            parsedLocalStorageData.importance === "Critical" ? generateCard(parsedLocalStorageData) : false; 
        }else {
            location.reload()       
        }
    }
}