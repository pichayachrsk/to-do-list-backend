This is RESTFUL API for To do list app

Note for interviewer:
- You can test this by following Project set up and Compile belows.
- You can find the api paths in src/routes and the prefix path is '/to-do-list' or you may able to use todolist.postman_collection file to test with POSTMAN.
- The bussiness logic/Management data is located in src/controllers/toDoListController.ts .
- The validations are located in src/middleware and src/schemas.
- The data will be read from data/toDoList.json . If you would like to back to default data, You can copy object in data/defaultTodoList.json
- And When you try to update the data by API, data/toDoList.json will re-write as well.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm start

```