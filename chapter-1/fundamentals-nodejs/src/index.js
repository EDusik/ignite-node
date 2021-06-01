const express = require('express');

const app = express();

/**
* GET - Get an information
* POST - Insert information
* PUT - Change an information
* DELETE - Delete an information
* PATCH - Change specific information
*/

// app.get('/', (request, response) => {
//   // return response.send('Hello world!');
//   return response.json({
//     message: 'Hello World Ignite - Fundamentals NodeJs!'
//   });
// });

app.get("/courses", (request, response) => {
	return response.json(["Course 1", "Course 2", "Course 3"]);
});

app.post("/courses", (request, response) => {
	return response.json(["Course 1", "Course 2", "Course 3", "Course 4"]);
});

app.put("/courses/:id", (request, response) => {
	return response.json(["Course 5", "Course 2", "Course 3", "Course 4"]);
});

app.patch("/courses/:id", (request, response) => {
	return response.json(["Course 1", "Course 2", "Course 3", "Course 4.4"]);
});

app.delete("/courses/:id", (request, response) => {
	return response.json(["Course 1", "Course 2", "Course 3"]);
});


app.listen(3333);
