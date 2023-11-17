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

        function createNewDocument(recipe) {
        // Create a new HTML document
        
        var newDoc = document.implementation.createHTMLDocument('New Document');

            // Access the head of the new document and set its innerHTML
        newDoc.head.innerHTML = `
          <meta charset="utf-8">
          <meta name="viewport" content="initial-scale=1, width=device-width">
          <!-- Bootstrap -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          <!-- My styles -->
          <link href="/static/styles.css" rel="stylesheet">
          <!-- Google Font -->
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
          <title>${recipe['title']}</title>
        `;
        
        

        // Access the body of the new document and set its innerHTML
        newDoc.body.innerHTML = `
                    <div class="container" id="nav-container">
                        <nav class=" border navbar navbar-expand-md fixed-top">
                            <a class="navbar-brand" href="/">
                                <img id="logo" src="static/images/logo.png" alt="logo DishDiaries">DishDiaries
                            </a>
                            <button aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#navbar" data-bs-toggle="collapse" type="button">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbar">
                            <ul class="navbar-nav ms-auto mt-2">
                            <li class="nav-item"><a class="nav-link" href="/logout">Log Out</a></li>
                            </ul>
        
                            </div>
                            </nav>
                        </div>
                        <!--Left side nav bar-->
                        <div class="sidenav">
                            <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addNewRecipe">Create New Recipe</button>
                          
                          </div>
                            
                          <!--Modal to add new recipe-->
                          <div class="modal fade" id="addNewRecipe" tabindex="-1" role="dialog" aria-labelledby="newRecipe" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="newRecipe">Add new recipe</h5>
                                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <form id="addnewrecipe">
                                <div class="modal-body">
                                  <label class="form-label">Recipe Title</label>
                                    <input type="text" name="title" class="form-control" placeholder="Recipe Title">                                 
                                  <div class="mb-3">
                                    <label for="ingredients" class="form-label">Ingredients</label>
                                    <textarea class="form-control" name="ingredients" id="ingredients" rows="5"></textarea>
                                  </div>
                                  <div class="mb-3">
                                    <label for="directions" class="form-label">Method</label>
                                    <textarea class="form-control" name="method" id="directions" rows="5"></textarea>
                                  </div>
                                  <div class="mb-5">
                                    <label for="notes" class="form-label">Notes</label>
                                    <textarea class="form-control" name="notes" id="notes" rows="5"></textarea>
                                  </div>
                                </div>
                          
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <main class="container-fluid py-5 text-center">




          <div class="container mt-5">
            <div class="row">
                <div class="col-lg-8">
                    <!-- Post content-->
                    <article>
                        <!-- Post header-->
                        <header class="mb-4">
                            <!-- Post title-->
                            <h1 class="fw-bolder mb-1">${recipe['title']}</h1>
                            <!-- Post meta content-->
                            <div class="text-muted fst-italic mb-2">Created in ${recipe['date']}</div>
                            
                        </header>
                        <!-- Preview image figure-->
                        <figure class="mb-4"><img class="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                        <!-- Post content-->
                        <h3>Ingredients</h3>
                        <section class="mb-5">
                            <p class="fs-5 mb-4">${recipe['ingredients']}</p>
                        </section>
                        <h3>Method</h3>
                        <section class="mb-5">
                            <p class="fs-5 mb-4">${recipe['method']}</p>
                        </section>
                        <h3>Notes</h3>
                        <section class="mb-5">
                            <p class="fs-5 mb-4">${recipe['notes']}</p>
                        </section>
                    </article>






                    </main>
                    <!-- Scripts -->
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
                    <script src="static/scripts.js"></script>
      
        
        `;
      
        return newDoc;
        }
        
      
        function createBlob(htmlContent) {
          return new Blob([htmlContent], { type: 'text/html' });
        }
      
        function createBlobURL(blob) {
          return URL.createObjectURL(blob);
        }
      
        function redirectToNewDocument(blobURL) {
          window.location.href = blobURL;
        }

        const recipe_button = document.getElementById(`${recipe['title']}`);
        recipe_button.addEventListener("click", function () {
          var newDoc = createNewDocument(recipe);  
          var htmlContent = new XMLSerializer().serializeToString(newDoc);
          var blob = createBlob(htmlContent);
          var blobURL = createBlobURL(blob);
          redirectToNewDocument(blobURL);
        
        });



    });



  });

 