var db = require('../database');


// db.query('SELECT TOP (1) [CurrencyCode], [Name], [ModifiedDate] FROM[AdventureWorks2014].[Sales].[Currency]', (err, recordset) => {
//     console.dir(recordset);
// });

console.log(db);

db.query(`SELECT TOP (1) [CurrencyCode], [Name], [ModifiedDate] FROM[AdventureWorks2014].[Sales].[Currency]`).then(function(recordset) {
    console.dir(recordset);
}).catch(function(err) {
    console.error(err);
});