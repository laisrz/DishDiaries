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

