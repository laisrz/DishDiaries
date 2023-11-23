// index page: create recipes cards
fetch('http://127.0.0.1:5000/recipes', {
    method: 'GET',
}).then(res => res.json())
  .then(data =>  {

    data.forEach((recipe) => {

        const newDivCard = document.createElement("div");

        newDivCard.classList.add('col-sm-6');

        const newDivCard1 = document.createElement("div");

        newDivCard.classList.add('card');

        const newDivCardBody = document.createElement("div");

        newDivCardBody.classList.add('card-body');

        const newH5 = document.createElement("h4");

        newH5.classList.add('card-title');

        const newImg = document.createElement("img")
        
        newImg.classList.add('card-img-top');
        

        newImg.src = recipe["photo_url"];
        
        const newa = document.createElement("button");
        
        newa.classList.add('btn', 'btn-outline-info');

        newa.setAttribute('id',`${recipe['title']}`);

        const newDelete = document.createElement("button");
        
        newDelete.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'delete_article', 'float-left');
        
        newDelete.setAttribute('id',`${recipe['title']} + ${recipe['date']}`);

        const newIconDelete = document.createElement("div");
        newIconDelete.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
            `;

        newH5.textContent = recipe['title'];

        newa.textContent = 'Ir para receita';

        


        
        // append all new elements to their parents
        newDivCard.appendChild(newDivCard1);
        newDivCard.appendChild(newDivCardBody);
        newDivCard.appendChild(newDelete);
        newDelete.appendChild(newIconDelete)
        newDivCardBody.appendChild(newImg);
        newDivCardBody.appendChild(newH5);
        newDivCardBody.appendChild(newa);
        
        
        

  

        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("cardcol");
        currentDiv.insertAdjacentElement('afterbegin', newDivCard);


        // create new page for the recipe 
            const recipe_button = document.getElementById(`${recipe['title']}`);
            recipe_button.addEventListener("click", function () {
            

            // change the information of the layout according with the recipe
            localStorage.setItem('recipeTitle', recipe['title']);
            localStorage.setItem('creationDate', recipe['date']);
            localStorage.setItem('newPhoto', recipe['photo_url']);
            localStorage.setItem('recipeIngredients', recipe['ingredients']);
            localStorage.setItem('newMethod', recipe['method']);
            localStorage.setItem('newNotes', recipe['notes']);

            window.location.href = "/layout2";
            
            
            
        
        });
        // delete article
        const deleteArticle = document.getElementById(`${recipe['title']} + ${recipe['date']}`);

// send form to the server 
deleteArticle.addEventListener('click', async () => {


        await fetch('http://127.0.0.1:5000/deleterecipe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'title': recipe['title'],
                        'date': recipe['date']

                    })
                }).then(res => res.json())
                    .then(data =>  { 
  
                    window.location.href = "/";
        });

    });
    });

// Search
const formSearch = document.querySelector('#formSearch');

const searchInput = document.querySelector('#input_search');


// send form to the server 
formSearch.addEventListener('submit', event => {
    event.preventDefault();

    // Get the user input
    let valueSearch = searchInput.value;
    


    // Construct the URL with parameters
    const url = `http://127.0.0.1:5000/search?query=${encodeURIComponent(valueSearch)}`;

    // Make the GET request
    fetch(url)
    .then(response => response.json())
    .then(data => {

        // Create div to insert the query
        const newDiv = document.createElement("div");

        const newp = document.createElement("p");
        
        newp.textContent = '';


        newDiv.appendChild(newp);

        const currentDivSearch = document.getElementById("searchBar");
        currentDivSearch.insertAdjacentElement('afterend', newDiv);


        // Extract the array of recipe titles from the response
        const titleList = (data.data && data.data.flat()) || [];

        // Select the cards based on the search results
        const recipeCards = document.querySelectorAll('.col-sm-6');

        recipeCards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent;

            // Check if the card title is in the search results
            if (titleList.includes(cardTitle)) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });

        // Update the message div
        if (titleList.length === 0) {
            newp.textContent = data.message;
        }

    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });




});

});




 