# SMS fullstack challenge

### Your mission, should you choose to accept it

1. Setup a database of your choice and seed it from the `data.json`.
2. Write a backend that provides a RESTful interface to interact with this data
(CRUD).
3. Create a frontend that displays a table with the columns
**city**, **start date**, **end date**, **price**, **status**, **color**.
All columns should be sortable. The data is requested from the backend.
4. Above the grid, please add two date pickers to filter the object by date
range.

Though this is a small app, please pay attention to your application structure.
Host your code on github or bitbucket and include a README with instructions on
how to install and run your application. Bonus-points for providing a
docker-compose file to run your project :)

### How to setup project

1. You need docker & node run this project
2. clone the repository
3. run **npm install** in directories 
    a. microserivces/sms_group_serivices
    b. ui/sms_group_ui
4. copy `.env.default` to `.env`
5. copy `./microservices/sms_group_service/src/config/config.json.default` to `./microservices/sms_group_service/src/config/config.json`
6. run **ng build --prod --aot**
7. run **docker-compose up**