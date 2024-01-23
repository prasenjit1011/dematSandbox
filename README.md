# NodeJS ExpressJS 

### Important command list to run this project

npm i <br />
nodemon app.js <br />


### API list 

#### API to get movie list : 
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
            "rating": "45", <br />
            "link": "http://test.com", <br />
            "__v": 0 <br />
        }, <br />
        { <br />
            "_id": "65af238d6b87fe4760999116", <br />
            "title": "World War", <br />
            "genre": "New Drama 16", <br />
            "rating": "4658", <br />
            "link": "http://ztest.com", <br />
            "__v": 0 <br />
        } <br />
    ] <br />
} <br /> <br />

#### API to search movie list with field title or genre: 
URL: http://localhost:3000/search?q={query} <br />
Method : GET <br />
Response Data <br />
{ <br />
    "status": true, <br />
    "msg": "Search data", <br />
    "data": [ <br />
        { <br />
            "_id": "65af238d6b87fe4760999116", <br />
            "title": "World War", <br />
            "genre": "New Drama 16", <br />
            "rating": "4658", <br />
            "link": "http://ztest.com", <br />
            "__v": 0 <br />
        } <br />
    ] <br />
} <br /> <br />


#### API to generate authorization brearer JWT token to access admin : 
URL: http://localhost:3000/gettoken <br />
Method : GET <br />


#### API to add movie : 
URL: http://localhost:3000/movies <br />
Method : POST <br />
Header authorization brearer token required :

##### Body params for add movie  
{<br />
    "title": Required, <br />
    "genre": Required, <br />
    "rating": Required, <br />
    "link": Required <br />
}<br /><br />


#### API to delete movie : 
URL: http://localhost:3000/movies/:id <br />
Method : GET <br />
Header authorization brearer token required : 
##### ** Movie id is required




