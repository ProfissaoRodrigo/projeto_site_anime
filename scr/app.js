const connection = require('./db');

connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('A solução é: ', results[0].solution);
});

connection.end();
