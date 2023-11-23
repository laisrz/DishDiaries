# DishDiaries
Final Project for the CS50 Harvard Course.
DishDiaries is a web application that allows users to create and store their recipes, in an user-friendly way. It has the ability to search through the recipes by its title, and to edit and delete them.
#### Video Demo:  <URL HERE>
### Technologies Used
*HTML, CSS, JavaScript
*Flask, Sqlite
## File's Description
### Templates
#### Apology.html:
## API Endpoints

- `GET "/"`- to access the homepage with instructions on how to perform all available operations in the API: shorten, delete,
update and retrieve an url
- `POST "/"`- to provide information in order to shorten an url. Returns the shortened url
- `GET "/<short_url>"` - to get the original url from the shortened url
- `PUT "/"` - to update a shortened url to point to a different long url
- `DELETE "/"` - to delete a shortened url

