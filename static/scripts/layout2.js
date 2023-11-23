 
 document.addEventListener('DOMContentLoaded', function () {
    // To alter the title of the recipe in js
    let recipeTitleElement = document.getElementById('recipe_title');
    let storedTitle = localStorage.getItem('recipeTitle');

    if (recipeTitleElement && storedTitle) {
       recipeTitleElement.innerHTML = storedTitle;
    }

    // To alter the creation date in js
    let dateElement = document.getElementById('creation_date');
    let storedDate = localStorage.getItem('creationDate');

    if (dateElement && storedDate) {
       dateElement.innerHTML = storedDate;
    }

    // To alter the photo in js
    let photoElement = document.getElementById('new_photo');
    let storedPhoto = localStorage.getItem('newPhoto');

    if (photoElement && storedPhoto) {
       photoElement.src = storedPhoto;
    }

    // To alter the ingredients in js
    let recipeIngredientsElement = document.getElementById('new_ingredients');
    let storedIngredients = localStorage.getItem('recipeIngredients');

    if (recipeIngredientsElement && storedIngredients) {
       recipeIngredientsElement.innerHTML = storedIngredients;
    }

    // To alter the method in js
    let recipeMethodElement = document.getElementById('new_method');
    let storedMethod = localStorage.getItem('newMethod');

    if (recipeMethodElement && storedMethod) {
       recipeMethodElement.innerHTML = storedMethod;
    }

    // To alter the notes in js
    let recipeNotesElement = document.getElementById('new_notes');
    let storedNotes = localStorage.getItem('newNotes');

    if (recipeNotesElement && storedNotes) {
       recipeNotesElement.innerHTML = storedNotes;
    }


// Edit article
    const editArticle = document.getElementById('edit_article');

    const formEdit = document.querySelector('#modalEditRecipe');


    // Get ids of edit form's inputs
    const recipeTitleInput = document.getElementById('recipeTitleInput');
    const recipeIngredientsInput = document.getElementById('editIngredients');
    const recipeMethodInput = document.getElementById('editMethod');
    const recipeNotesInput = document.getElementById('editNotes');

    // Change <br> notation to newlines
    let formattedIngredients = storedIngredients.replace(/<br>/g, '\n');
    let formattedMethod = storedMethod.replace(/<br>/g, '\n');
    let formattedNotes = storedNotes.replace(/<br>/g, '\n');

    // send form to the server 
    editArticle.addEventListener('click', async () => {



        recipeTitleInput.value = storedTitle;

        recipeIngredientsInput.innerHTML = formattedIngredients;

        recipeMethodInput.value = formattedMethod;

        recipeNotesInput.value = formattedNotes;
         

        formEdit.addEventListener('submit', async event => {
         event.preventDefault();
        
        const myFormData = new FormData(formEdit);
        const formDataObject = Object.fromEntries(myFormData.entries());

         try {
    
            const response = await fetch('http://127.0.0.1:5000/editrecipe', {
               method: 'POST',
               headers: {
                     'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                     'data': formDataObject,
                     'date': storedDate
                     
            })
         });
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Get element by id to be updated
        let recipeIngredientsElement = document.getElementById('new_ingredients');
        
        let recipeMethodElement = document.getElementById('new_method');

        let recipeNotesElement = document.getElementById('new_notes');
        

        // Update element
        recipeIngredientsElement.innerHTML = data.ingredients;
        recipeMethodElement.innerHTML = data.method;
        recipeNotesElement.innerHTML = data.notes;

        // Close the modal
        $('#editModal').modal('hide');
      } catch (error) {
          console.error('Error:', error.message);
          
      }
               
               
               
        });
    
         });
    });

    




