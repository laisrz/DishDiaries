 
 document.addEventListener('DOMContentLoaded', function () {
    // To alter the title of the recipe in js
    var recipeTitleElement = document.getElementById('recipe_title');
    var storedTitle = localStorage.getItem('recipeTitle');

    if (recipeTitleElement && storedTitle) {
       recipeTitleElement.innerHTML = storedTitle;
    }

    // To alter the creation date in js
    var dateElement = document.getElementById('creation_date');
    var storedDate = localStorage.getItem('creationDate');

    if (dateElement && storedDate) {
       dateElement.innerHTML = storedDate;
    }

    // To alter the photo in js
    var photoElement = document.getElementById('new_photo');
    var storedPhoto = localStorage.getItem('newPhoto');

    if (photoElement && storedPhoto) {
       photoElement.src = storedPhoto;
    }

    // To alter the ingredients in js
    var recipeIngredientsElement = document.getElementById('new_ingredients');
    var storedIngredients = localStorage.getItem('recipeIngredients');

    if (recipeIngredientsElement && storedIngredients) {
       recipeIngredientsElement.innerHTML = storedIngredients;
    }

    // To alter the method in js
    var recipeMethodElement = document.getElementById('new_method');
    var storedMethod = localStorage.getItem('newMethod');

    if (recipeMethodElement && storedMethod) {
       recipeMethodElement.innerHTML = storedMethod;
    }

    // To alter the notes in js
    var recipeNotesElement = document.getElementById('new_notes');
    var storedNotes = localStorage.getItem('newNotes');

    if (recipeNotesElement && storedNotes) {
       recipeNotesElement.innerHTML = storedNotes;
    }




    

 });


