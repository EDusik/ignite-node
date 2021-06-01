const express = require('express');

const app = express();

// to be able to use JSON in the application
app.use(express.json());

/**
# Requisition Methods
* GET - Get an information
* POST - Insert information
* PUT - Change an information
* PATCH - Change specific information
* DELETE - Delete an information

# Types of params
  Route Params => (Identify, edit, search or delete an recurse)
  Query Params => (Filter / Pagination)
  Body params =>  (Objects to Insert / Change - JSON)
*/

// app.get('/', (request, response) => {
//   // return response.send('Hello world!');
//   return response.json({
//     message: 'Hello World Ignite - Fundamentals NodeJs!'
//   });
// });

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query);
	return response.json(["Course 1", "Course 2", "Course 3"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);
	return response.json(["Course 1", "Course 2", "Course 3", "Course 4"]);
});

app.put("/courses/:id", (request, response) => {
  const params = request.params;
  console.log(params);
	return response.json(["Course 5", "Course 2", "Course 3", "Course 4"]);
});

app.patch("/courses/:id", (request, response) => {
	return response.json(["Course 1", "Course 2", "Course 3", "Course 4.4"]);
});

app.delete("/courses/:id", (request, response) => {
	return response.json(["Course 1", "Course 2", "Course 3"]);
});


app.listen(3333);
