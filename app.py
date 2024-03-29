
import os
import sqlite3
from flask import Flask, redirect, render_template, request, session, jsonify, url_for
from flask_session import Session
import json
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import date
from helpers import login_required, apology



# Configure application
app = Flask(__name__)


# Configure database

conn = sqlite3.connect('dishdiaries.db')

cursor = conn.cursor()

# create users table

cursor.execute("""CREATE TABLE IF NOT EXISTS users (
                        id INTEGER NOT NULL PRIMARY KEY,
                        username TEXT NOT NULL,
                        password TEXT NOT NULL
                      )""")

cursor.execute("""CREATE TABLE IF NOT EXISTS recipes (
                        recipe_id INTEGER NOT NULL PRIMARY KEY,
                        title TEXT NOT NULL,
                        ingredients TEXT NOT NULL,
                        method TEXT NOT NULL,
                        notes TEXT NOT NULL,
                        creation_date TEXT NOT NULL,
                        user_id TEXT NOT NULL,
                        FOREIGN KEY(user_id) REFERENCES user(id)
                      )""")


# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static', 'images', 'users_photos'))
Session(app)

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        #Connecting to database
        conn = sqlite3.connect('dishdiaries.db')

        cursor = conn.cursor()

        # Validate user's information    
        username = request.form.get("username")
        password = request.form.get("password")
        # Ensure username was submitted
        if not username:
            return apology("must provide username", 400)
            

        # Ensure password was submitted
        if not password:
           return apology("must provide password", 400)

        # Query database for username
        cursor.execute("SELECT * FROM users WHERE username = ?", [username])
        rows = cursor.fetchall()
    

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0][2], password
        ):
            return apology("Username and/or password doesn't exist", 400)
        
        
        # Remember which user has logged in
        session["user_id"] = rows[0][0]

        conn.close()

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")
    

@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # POST
    if request.method == "POST":
        
        #Connecting to database
        conn = sqlite3.connect('dishdiaries.db')

        cursor = conn.cursor()

        # Get username and password from form
        username = request.form.get("username")
        password = request.form.get("password")

        # check if username is blank
        if not username:
            return apology("Must provide username", 400)
        
        # check if username already exists
        cursor.execute(
            "SELECT username FROM users WHERE username = ?",
            [username],
        )
        name = cursor.fetchone()

        if name:
            return apology("Username already in use", 400)

        # check if password or confirm password is blank
        if not password:
            return apology("Password must be provided", 400)
    
        if not request.form.get("confirm_password"):
            return apology("Confirm password!", 400)

        # check if password and confirmation match
        if password != request.form.get("confirm_password"):
            return apology("Confirmed password and password don't match!", 400)

        hash = generate_password_hash(password)

        cursor.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username,
            hash)
        )
        conn.commit()

        conn.close()

        return redirect("/")

    # GET
    return render_template("register.html")
    

@app.route("/")
@login_required
def index():
    return render_template("/index.html")


@app.route("/addnewrecipe", methods=["POST"])
@login_required
def add_new_recipe():
    '''Insert new recipe into database'''
    #Connecting to database
    conn = sqlite3.connect('dishdiaries.db')

    cursor = conn.cursor()
    
    # Get data from client
    title = request.form.get('title')
    photo = request.files['photo']
    ingredients_form = request.form.get('ingredients')
    ingredients = ingredients_form.replace('\n', '<br>')
    method_form = request.form.get('method')
    method = method_form.replace('\n', '<br>')
    notes_form = request.form.get('notes')
    notes = notes_form.replace('\n', '<br>')
    user_id = session["user_id"]
    date_today = date.today()

    # Save photo on file and generate url for it
    photo.save(os.path.join(app.config['UPLOAD_FOLDER'], f'{title}_photo.jpg'))
    photo_url = url_for('static', filename=f'images/users_photos/{title}_photo.jpg')


    cursor.execute('''INSERT INTO recipes (
                       title,
                       ingredients,
                       method,
                       notes,
                       creation_date,
                       user_id) VALUES (?, ?, ?, ?, ?, ?)''',
                       (title, ingredients, method, notes, date_today, user_id)
                    )
    conn.commit()
    conn.close()
    
    response = jsonify({"title": title, "photo": photo_url, "ingredients": ingredients, "method": method, "notes": notes, "date": date_today})
    response.status_code = 200
    return response

@app.route("/recipes")
@login_required
def get_recipes():

    #Connecting to database
    conn = sqlite3.connect('dishdiaries.db')

    cursor = conn.cursor()

    # Get recipes from database
    user_id = session["user_id"]

    cursor.execute("SELECT * FROM recipes WHERE user_id = ?", [user_id])
    rows = cursor.fetchall()

    recipe_list = []
  
    for row in rows:
        rep = {'title': row[1], 
               'ingredients': row[2],
                'method':row[3],
                'notes':row[4],
                'date': row[5],
                'photo_url': url_for('static', filename=f'images/users_photos/{row[1]}_photo.jpg')
            }
       
        recipe_list.append(rep)
        

    conn.close()
    
    # Turn recipe_list into json
    response = json.dumps(recipe_list)
    

    return response

@app.route("/deleterecipe", methods=['POST'])
@login_required
def delete_recipe():
    #Connecting to database
    conn = sqlite3.connect('dishdiaries.db')

    cursor = conn.cursor()

    # Get data from client
    data = request.get_json()
    title = data['title']
    date_recipe = data['date']
    user_id = session["user_id"]

    cursor.execute("SELECT * FROM recipes WHERE user_id = ? AND title = ? AND creation_date = ?", (user_id, title, date_recipe))
    rows = cursor.fetchall()
    

    # Delete recipe from database
    if len(rows) == 1:
        id = rows[0][0]
        photo_filename = rows[0][1]
        
        cursor.execute("DELETE FROM recipes WHERE recipe_id = ?", [id])
        conn.commit()
        conn.close()
        # Delete images from file
        # Construct the path to the file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f'{photo_filename}_photo.jpg')

        # Check if the file exists
        if os.path.exists(file_path):
            # Remove the file
            os.remove(file_path)

            response = jsonify({"message": "Recipe deleted"})
            response.status_code = 200
            return response
        
        else:
            return jsonify({"message": "File not found."})



    response = jsonify({"message": "Unable to delete recipe"})
    response.status_code = 400
    return response


@app.route("/editrecipe", methods=['POST'])
@login_required
def edit_recipe():
    #Connecting to database
    conn = sqlite3.connect('dishdiaries.db')

    cursor = conn.cursor()

    # Get data from client
    data = request.get_json()
    title = data['data']['title']
    ingredients = data['data']['ingredients']
    method = data['data']['method']
    notes = data['data']['notes']
    date_recipe = data['date']
    user_id = session["user_id"]
    
    # Replace /n for <br> to respect new lines
    ingredients_recipe = ingredients.replace('\n', '<br>')
    method_recipe = method.replace('\n', '<br>')
    notes_recipe = notes.replace('\n', '<br>')
    
    
    # Update database
    cursor.execute('''UPDATE recipes SET
                    title = ?,
                    ingredients = ?,
                    method = ?,
                    notes = ?
                    WHERE user_id = ?
                    AND title = ?
                    AND creation_date = ?''',
                    (title, ingredients_recipe, method_recipe, notes_recipe, user_id, title, date_recipe))
    conn.commit()
    conn.close

    # Respond to the client
    response = jsonify({"title": title, "ingredients": ingredients_recipe, "method": method_recipe, "notes": notes_recipe})
    response.status_code = 200
    return response


@app.route("/search", methods=['GET'])
@login_required
def search():
    #Connecting to database
    conn = sqlite3.connect('dishdiaries.db')
    cursor = conn.cursor()

    # Retrieve parameters from the request
    query = request.args.get('query')
    
    # Get user_id
    user_id = session["user_id"]

    # Search database
    cursor.execute("SELECT title FROM recipes WHERE user_id = ? AND title LIKE ? LIMIT 10", (user_id, f"%{query}%"))
    rows = cursor.fetchall()
    conn.close()

    # Return message if the search didn't return any data
    if not rows:
        return jsonify({"message": "No search results"})
    

    title_list = []
    
    for row in rows:
        title_list.append(row)

    # Response to the client
    results = {
        'query': query,
        'data': title_list  
    }

    return jsonify(results)
    

@app.route("/layout2")
@login_required
def get_layout():
    return render_template("layout2.html")

if __name__ == '__main__':
    app.run(debug=True)

    
