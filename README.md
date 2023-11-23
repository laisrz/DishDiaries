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
#### Scripts
##### Index.js: 
## API Endpoints

- `GET "/"`- to access the homepage with instructions on how to perform all available operations in the API: shorten, delete,
update and retrieve an url
- `POST "/"`- to provide information in order to shorten an url. Returns the shortened url
- `GET "/<short_url>"` - to get the original url from the shortened url
- `PUT "/"` - to update a shortened url to point to a different long url
- `DELETE "/"` - to delete a shortened url

