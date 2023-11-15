// Send info on form 'add new recipe' in the index page to the server
const formURL = document.querySelector('#addnewrecipe');

formURL.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formURL);
    const data = Object.fromEntries(formData);

    fetch('http://127.0.0.1:5000/addnewrecipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {

        const newDivCard = document.createElement("div");

        newDivCard.classList.add('card');

        const newDivCardBody = document.createElement("div");

        newDivCardBody.classList.add('card-body');

        const newH5 = document.createElement("h5");

        newH5.classList.add('card-title');

        const newH6 = document.createElement("h6");

        const newp = document.createElement("p");

        newp.classList.add('card-text');
        
        const newa = document.createElement("a");

        newa.classList.add('btn', 'btn-primary');

        newa.href =  `/${data['title']}`;

        newH5.textContent = data['title'];

        newH6.textContent = 'Ingredients';

        newp.textContent = data['ingredients'];

        newa.textContent = 'Veja mais';


        
        // append all new elements to their parents
        newDivCard.appendChild(newDivCardBody);
        newDivCardBody.appendChild(newH5);
        newDivCardBody.appendChild(newH6);
        newDivCardBody.appendChild(newp);
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

        newDivCard.classList.add('card');

        const newDivCardBody = document.createElement("div");

        newDivCardBody.classList.add('card-body');

        const newH5 = document.createElement("h5");

        newH5.classList.add('card-title');

        const newH6 = document.createElement("h6");

        const newp = document.createElement("p");

        newp.classList.add('card-text');
        
        const newa = document.createElement("a");

        newa.classList.add('btn', 'btn-primary');

        newa.href =  `/${recipe['title']}`;

        newH5.textContent = recipe['title'];

        newH6.textContent = 'Ingredients';

        newp.textContent = recipe['ingredients'];

        newa.textContent = 'Veja mais';


        
        // append all new elements to their parents
        newDivCard.appendChild(newDivCardBody);
        newDivCardBody.appendChild(newH5);
        newDivCardBody.appendChild(newH6);
        newDivCardBody.appendChild(newp);
        newDivCardBody.appendChild(newa);

  

        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("cardcol");
        currentDiv.insertAdjacentElement('afterbegin', newDivCard);

    })



  });

