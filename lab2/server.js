const connect = require('connect');
const url = require('url');

const app = connect();

app.use('/lab2', (req, res) => {
  const query = url.parse(req.url, true).query;
  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);
  
    // checking to see if a valid method was selected

    const validMethods = ['add', 'subtract', 'multiply', 'divide'];
    if (!validMethods.includes(method)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid method. Valid methods are: add, subtract, multiply and divide.' }));
    }

    // doing the math

    let result;
    switch (method) {
      case 'add':
        result = x + y;
        break;
      case 'subtract':
        result = x - y;
        break;
      case 'multiply':
        result = x * y;
        break;
      case 'divide':
        if (y === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Cannot divide by zero.' }));
        }
        result = x / y;
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid method. Valid methods are: add, subtract, multiply, divide.' }));
    }
  
    // Return the result as JSON
    const response = {
      x: query.x,
      y: query.y,
      operation: method,
      result: result.toString()
    };
  
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, 2));

  });
  

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
