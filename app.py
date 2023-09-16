import sqlite3
from flask import Flask, redirect, render_template, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
from helpers import login_required

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure sqlite database
conn = sqlite3.connect('dishdiaries.db')

cursor = conn.cursor()

# create users table
cursor.execute('''CREATE TABLE IF NOT EXISTS users(
                        user_id INTEGER NOT NULL PRIMARY KEY,
                        username TEXT NOT NULL,
                        password TEXT NOT NULL,
                        email TEXT NOT NULL,
                        photo BLOB
            )''')

# create follow table
cursor.execute("""CREATE TABLE IF NOT EXISTS follow (
                        follow_id INTEGER NOT NULL PRIMARY KEY,
                        followers INTEGER,
                        following INTEGER,
                        follow_user INTEGER NOT NULL,
                        FOREIGN KEY(follow_user) REFERENCES users(user_id)
                      )""")

# Create recipes table
cursor.execute("""CREATE TABLE IF NOT EXISTS recipes (
                        recipe_id INTEGER NOT NULL PRIMARY KEY,
                        title TEXT NOT NULL,
                        photo_primary BLOB,
                        ingredients TEXT NOT NULL,
                        method TEXT NOT NULL,
                        notes TEXT,
                        photo_secondary BLOB,
                        tag_time INTEGER,
                        tag_yield TEXT,
                        tag_difficultlevel TEXT,
                        creation_date INTEGER NOT NULL,
                        recipe_user INTEGER NOT NULL,
                        FOREIGN KEY(recipe_user) REFERENCES users(user_id)
                      )""")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            response = jsonify({"message": "Must provide username"})
            response.status_code = 400
            return response

        # Ensure password was submitted
        if not request.form.get("password"):
            response = jsonify({"message": "Must provide password"})
            response.status_code = 400
            return response

        # Query database for username
        rows = cursor.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            response = jsonify({"message": "Username and/or password doesn't exist"})
            response.status_code = 400
            return response

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == 'GET':
        return render_template("/register.html")
    

@app.route("/")
def index():
    return render_template("/index.html")


if __name__ == '__main__':
    app.run(debug=True)

    
