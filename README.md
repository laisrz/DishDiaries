# DishDiaries
Final Project for the CS50 Harvard Course.
DishDiaries is a web application that allows users to create and store their recipes, in an user-friendly way. It has the ability to search through the recipes by its title, and to edit and delete them.
#### Video Demo:  <URL HERE>
## Technologies Used
*HTML, CSS, JavaScript
*Flask, Sqlite
## File's Description
### Templates
#### Apology.html: contain link to image that is shown when the user doesn't provide the required information during registering or logging in.
#### Index.html: contain the structure for the search bar and cards for recipes.
#### Layout.html: contain the layout's structure for all the web pages on the website. Including the navbar and sidebar, and the modal for creating new recipes.
#### Layout2.html: contain the layout's structure for the pages that exhibit the full recipe, plus the structure for the edit button and modal.
#### Login.html: contain the structure for the login page.
#### Register.html: contain the structure for the register page.
### Static
#### Styles.css: contain all the styles for the elements of the page.
### Scripts
#### Index.js: contains the code for the index page. It fetches the endpoint "/recipes" to get all the recipes of the user stored in the database. Then, for each recipe, it creates the html elements for the card that will be displayed on the index page. This elements are then appended to each other and inserted after the element presented on the index.html file, for the recipe's card. This file also contains the logic for, when the user clicks on the button to "Go to recipe", the recipe's data fetched from the server gets stored in the local storage, enabling the layout2.js file to access it and manipulate the data. It also contains the logic to delete the recipe, using the fetch api to post the information about the recipe that the user clicked to get deleted and then returning the user to the home page. Finally, it contains the code for the search feature, fetching the url with the search parameters and then only displaying the cards that the title is contained in the data returned by the server, or, in case of no results, displaying a message to the user.
#### Layout.js: contains the code to send a post request to the server for creating a new recipe. It uses fetch api to send this post request, and then creates a new recipe card with the data sent by the server back.
#### Layout2.js: contains code to populate the layout.html with the data from the recipe the user selected. It gets the data stored in local storage and exhibit in the recipe page. It also contains the logic to edit the recipe, by sending a post request via fetch api and then updating the recipe page with the information returned by the server. 
### App.py:
## API Endpoints

- `GET "/"`- to access the homepage with instructions on how to perform all available operations in the API: shorten, delete,
update and retrieve an url
- `POST "/"`- to provide information in order to shorten an url. Returns the shortened url
- `GET "/<short_url>"` - to get the original url from the shortened url
- `PUT "/"` - to update a shortened url to point to a different long url
- `DELETE "/"` - to delete a shortened url

