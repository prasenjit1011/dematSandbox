# NodeJS ExpressJS 

### Important command list

npm init <br />
npm i --save express express-session body-parser ejs mongodb  <br />
npm i --save-dev nodemon <br />
nodemon app.js <br />


### API list 

#### API to get movie list : 
URL: http://localhost:3000/movies <br />
Method : GET <br />


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




