const sql = require("mssql");

// const config = {
//     server: 'LAPTOP-7AC9IRJ0\\SQLEXPRESS',
//     database: 'Northwind',
//     user: 'sa',
//     password: '123456',
//     encrypt: false,
//     trustServerCertificate: false, // เพิ่มค่า trustServerCertificate เพื่อปิดการใช้งานใบรับรองของเซิร์ฟเวอร์
// };

// sql.connect(config)
//     .then(pool => {
//         return pool.request().query('SELECT * FROM Products WHERE ProductID = 77');
//     }).then(result => {
//         console.log('ProductID:', result.recordset[0].ProductID);
//         console.log('ProductName:', result.recordset[0].ProductName);
//         console.log('SupplierID:', result.recordset[0].SupplierID);
//         console.log('CategoryID:', result.recordset[0].CategoryID);
//         console.log('QuantityPerUnit:', result.recordset[0].QuantityPerUnit);
//         console.log('UnitPrice:', result.recordset[0].UnitPrice);
//         console.log('UnitsInStock:', result.recordset[0].UnitsInStock);
//         console.log('UnitsOnOrder:', result.recordset[0].UnitsOnOrder);
//         console.log('ReorderLevel:', result.recordset[0].ReorderLevel);
//         console.log('Discontinued:', result.recordset[0].Discontinued);
//         console.log('output:', result.output);
//         console.log('rowsAffected:', result.rowsAffected);
//     }).catch(err => {
//         console.error('Error:', err);
//     });

const sqlConfig = {
  server: 'LAPTOP-7AC9IRJ0\\SQLEXPRESS',
  user: 'sa',
  password: '123456',
  database: 'CS369DB',
  encrypt: false, 
  trustServerCertificate: false // change to true for local dev / self-signed certs
}

module.exports = sqlConfig
//เก็บโค้ดนี้ไว้ใช้งานจริง แต่ไม่เห็นผลลัพธ์การ connect db   run สำเร็จจะนิ่งๆ  ไม่สำเร็จจะแสดง error   

// const config = {
//   server: 'LAPTOP-FLA3D2A9\\SQLEXPRESS',
//   database: 'Northwind',
//   user: 'sa',
//   password: 'P@ssw0rd',
//   encrypt: false,
//   trustServerCertificate: false, // เพิ่มค่า trustServerCertificate เพื่อปิดการใช้งานใบรับรองของเซิร์ฟเวอร์
// };
