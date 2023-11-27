# SoftUni - VueJS - Cooking Book Blog
 
# Overview

A chef's blog with his personal recipes that has **several** categories of recipes

## Links/paths

### Accessible to users and guests:
- Home/Landing page
	> Every time you navigate to it, it puts three random recipes
- Recipes
	> This page contains all the recipes, it has filtering and search form so users can find what they want faster and easier
- Recipe details
	> Detailed pages for every recipe (Guest can't post reviews nor add products to Favorites)
- About 
    > Static, just for aesthetics
- Not found page (404)
	> A page which will show up any time a navigation to invalid path is made
	> Accessible to admin accounts as well

### Accessible to users only:
- A personal profile page, which contains the user's info and some functionalities:
	> Edit user data **(email and password)**
    > Delete profile
- Favorites page
	>Included as path within the profile page
- User's comments/reviews
	> Also included within the profile page
- Logout
	> Accessible to admin accounts as well

**Users also are permitted to post reviews, edit and delete them and add products to their favorites page.**

### Accessible to guests only:
- Login
- Register
### Accessible to admins only:
- (Technically) The form for login with admin account 
	- For the aims of the project high complexity is not necessary and it will be accessible through a special URL
- Dashboard
   > Contains statistics about:
     - Registered and deleted accounts
     - Added and deleted recipes
     - Published and deleted reviews

- Create/Edit recipe forms/pages
    >In the Recipes page there is button for adding recipe visible only for the admin
    In Details page there is button for editing recipe, also visible only for the admin
    Admin does not have the permission to post, edit or delete any reviews

- Users
	>A page for managing users' accounts, limited access for changes
	- Delete account
	- Block/Unblock account

# Information about technologies used
## Note: this section probably will be edited later on

The project is created from two parts: **server** and **client**
## Client side

For the client side, I used [VueJS](https://vuejs.org/), a framework usually for creating SPA


## Server side

For the server side, I used [ExpressJS](https://expressjs.com/), a framework that helps building server side of projects. This framework is for the [Node.JS](https://nodejs.org/en) runtime environment.

### Other libraries and third-party libraries and resources used

For the database I chose to work with [MongoDB](https://www.mongodb.com/), a NoSQL DataBase.
They provide a nice tool for managing database visually instead of using commands: [MongoDB Compass](https://www.mongodb.com/products/compass)

The back-end uses [MongooseJS](https://mongoosejs.com/) which provides elegant object modeling for **MongoDB**

For validations I used: 
- [bcrypt](https://www.npmjs.com/package/bcrypt), which is a hashing tool for passwords
- [express-validator](https://www.npmjs.com/package/express-validator), which provides functions for validating user inputs
- [cookie-parser](https://www.npmjs.com/package/cookie-parser), which provides middleware for cookie sending and receiving, checking etc.
- [JsonWebToken(JWT)](https://www.npmjs.com/package/jsonwebtoken), which is alternative for cookies, and can contain much more data

For developing I used [nodemon](https://www.npmjs.com/package/nodemon): a tool which automatically restarts the application upon detecting changes in files/directories

# How to start the project
**NOTE:** You must have installed **MongoDB** for storing data first, as well as **Node.JS** for the runtime environment
When you download the project:
- Open two terminals/command prompts/powershells
- With the first, navigate to the 'Server' folder
	>type `npm i`, after the process is finished type `npm start`
- With the second terminal navigate to the 'Client' folder and repeat the previous commands.
- The Client side will open usually on the address **localhost:3000**
- The Server side will be started on the address **localhost:3030**