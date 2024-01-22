# NodeJS ExpressJS 

### Important command list

npm init <br />
npm i --save express express-session body-parser ejs mongodb  <br />
npm i --save-dev nodemon <br />
nodemon app.js <br />


### API list 

#### Get Movie List : <br />
API Url: http://localhost:3000/movies <br />
Method : GET <br />


#### Generate authorization brearer JWT token to access admin : <br />
API Url: http://localhost:3000/gettoken <br />
Method : GET <br />


#### Add movie : <br />
API Url: http://localhost:3000/movies <br />
Method : POST <br />
Header authorization brearer token required :  <br />

##### Body params for add movie  <br />
{<br />
    "title": Required, <br />
    "genre": Required, <br />
    "rating": Required, <br />
    "link": Required <br />
}<br /><br />


#### Delete movie : <br />
API Url: http://localhost:3000/movies/:id <br />
Method : GET <br />
Header authorization brearer token required : 

##### ** Movie id is required




