// Send info on form 'add new recipe' in the index page to the server
const formURL = document.querySelector('#addnewrecipe');


// send form to the server 
formURL.addEventListener('submit', event => {
    event.preventDefault();
    
    
    const formData = new FormData(formURL);
    

    fetch('http://127.0.0.1:5000/addnewrecipe', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
      .then(data => {

        const newDivCard = document.createElement("div");

        newDivCard.classList.add('col-sm-6');

        const newDivCard1 = document.createElement("div");

        newDivCard.classList.add('card');

        const newDivCardBody = document.createElement("div");

        newDivCardBody.classList.add('card-body');

        const newH5 = document.createElement("h5");

        newH5.classList.add('card-title');

        const newImg = document.createElement("img")

        newImg.setAttribute("id", "recipePhoto");
        console.log("Image URL:", data["photo"]);

        newImg.src = data["photo_url"];
        
        const newa = document.createElement("button");

        newa.classList.add('btn', 'btn-outline-info');

        newa.href =  `/${data['title']}`;

        newH5.textContent = data['title'];


        newa.textContent = 'Veja mais';
        

        
        // append all new elements to their parents
        newDivCard.appendChild(newDivCard1);
        newDivCard.appendChild(newDivCardBody);
        newDivCardBody.appendChild(newH5);
        newDivCardBody.appendChild(newImg);
        newDivCardBody.appendChild(newa);

  

        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("cardcol");
        currentDiv.insertAdjacentElement('afterbegin', newDivCard);

        formURL.submit();
        

      })
});

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
        
        console.log("Image URL:", recipe["photo_url"]);

        newImg.src = recipe["photo_url"];
        
        const newa = document.createElement("button");
        
        newa.classList.add('btn', 'btn-outline-info', 'btn-sm');
        newa.setAttribute('id',`${recipe['title']}`);

        newH5.textContent = recipe['title'];

        newa.textContent = 'Ir para receita';


        
        // append all new elements to their parents
        newDivCard.appendChild(newDivCard1);
        newDivCard.appendChild(newDivCardBody);
        newDivCardBody.appendChild(newImg);
        newDivCardBody.appendChild(newH5);
        newDivCardBody.appendChild(newa);

  

        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("cardcol");
        currentDiv.insertAdjacentElement('afterbegin', newDivCard);


        // create new page for the recipe 

        const recipe_button = document.getElementById(`${recipe['title']}`);
        recipe_button.addEventListener("click", function () {
          

          // change the title of the layout

          
          localStorage.setItem('recipeTitle', recipe['title']);
          localStorage.setItem('creationDate', recipe['date']);
          localStorage.setItem('newPhoto', recipe['photo_url']);
          localStorage.setItem('recipeIngredients', recipe['ingredients']);
          localStorage.setItem('newMethod', recipe['method']);
          localStorage.setItem('newNotes', recipe['notes']);

          location.assign("/layout2")
          
        
        });



    });



  });

 