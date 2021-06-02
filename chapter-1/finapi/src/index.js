const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const customers = [];

// Middleware
function verifyIfExistsAccountCpf(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(
    (customer) => customer.cpf === cpf
  );

  if (!customer) {
    return response.status(400).json({ 
      error: "Customer not found"
    })
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc = operation.amount;
    }
  }, 0);

  return balance;
}

app.use(express.json());

app.post("/account", (request, response) => {

  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists!"
    });
  }

  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  });

  return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCpf, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCpf, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCpf, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({
      error: "Insufficient funds!"
    });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation);[]
  return response.status(201).send();
});

// Always use middleware
// app.use(verifyIfExistsAccountCpf);
app.listen(3333);

