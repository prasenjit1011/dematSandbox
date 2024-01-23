# Movie CRUD API using NodeJS, ExpressJS, MongoDB, Mongoose, Node-Cache 

### Important command list to run this project

npm i <br />
nodemon app.js <br />


### 1) API to get movie list : 
URL: http://localhost:3000/movies <br />
Method : GET <br />
Response Data <br />
{ <br />
    "status": true, <br />
    "msg": "Movie List", <br />
    "data": [ <br />
        { <br />
            "_id": "65af21f5a462b29e1a011c9a", <br />
            "title": "Hello", <br />
            "genre": "Drama 16", <br />
            "rating": 45, <br />
            "link": "http://test.com", <br />
            "__v": 0 <br />
        }, <br />
        { <br />
            "_id": "65af238d6b87fe4760999116", <br />
            "title": "World War", <br />
            "genre": "New Drama 16", <br />
            "rating": 4658, <br />
            "link": "http://ztest.com", <br />
            "__v": 0 <br />
        } <br />
    ] <br />
} <br /> <br />


### 2) API to search movie list with field title or genre: 
URL: http://localhost:3000/search?q={query} <br />
Method : GET <br />

Eg. API URL : http://localhost:3000/search?q=new <br /> 
Response Data <br />
{ <br />
    "status": true, <br />
    "msg": "Search data", <br />
    "data": [ <br />
        { <br />
            "_id": "65af238d6b87fe4760999116", <br />
            "title": "World War", <br />
            "genre": "New Drama 16", <br />
            "rating": 4658, <br />
            "link": "http://ztest.com", <br />
            "__v": 0 <br />
        } <br />
    ] <br />
} <br /> <br />


#### 3) API to generate authorization brearer JWT token to access admin : 
URL: http://localhost:3000/gettoken <br />
Method : GET <br />
Response Data <br />
{ <br />
    "status": true, <br />
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyIEFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1OTc4NDYwLCJleHAiOjE3MDU5ODIwNjB9.lmi1KLXvQ9oPu0nArJrOus7Bk0zoSHFYjtR_pRYa8s4" <br />
} <br /> <br />


### 4) API to add movie : 
URL: http://localhost:3000/movies <br />
Method : POST <br />
Header authorization brearer token required : <br />
##### Body params for add movie  
{<br />
    "title": Required, <br />
    "genre": Required, <br />
    "rating": Required, <br />
    "link": Required <br />
}<br /><br />
Response Data <br />
{ <br />
    "status": true, <br />
    "msg": "Data inserted successfully!", <br />
    "data": { <br />
        "title": "World War", <br />
        "genre": "New Drama 16", <br />
        "rating": 4658, <br />
        "link": "http://ztest.com", <br />
        "_id": "65af238d6b87fe4760999116", <br />
        "__v": 0 <br />
    } <br />
} <br /> <br />


### 5) API to update movie : 
URL: http://localhost:3000/movies/:id <br />
Method : PUT <br />
Header authorization brearer token required : <br />
##### Body params for add movie  
{<br />
    "title": Required, <br />
    "genre": Required, <br />
    "rating": Required, <br />
    "link": Required <br />
}<br /><br />
Response Data <br />
{ <br />
    "status": true, <br />
    "msg": "Data updated successfully!", <br />
    "data": { <br />
        "title": "World War", <br />
        "genre": "New Drama 16", <br />
        "rating": 4658, <br />
        "link": "http://ztest.com", <br />
        "_id": "65af238d6b87fe4760999116", <br />
        "__v": 0 <br />
    } <br />
} <br /> <br />


### 6) API to delete movie : 
URL: http://localhost:3000/movies/:id <br />
Method : GET <br />
Header authorization brearer token required : 
##### ** Movie id is required
Eg. API URL :http://localhost:3000/movies/65aea7358f80ea55ea342760
Response Data <br />
{ <br />
    "status": true, <br />
    "msg": "Movie deleted successfully." <br />
} <br />



