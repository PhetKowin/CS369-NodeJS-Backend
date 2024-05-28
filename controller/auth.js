const config = require('../sqlconfig');  //ดึงข้อมูล connection จาก sqlconfig.js
const sql = require('mssql');   // ใช้ module sql

async function postUser(user) {  
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    console.log(user)
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('Username', sql.VarChar, user.Username)  
            .input('Password', sql.VarChar, user.Password) 
            .output('code', sql.NVarChar, 'success')
            .query('SELECT * FROM Users WHERE Username = @Username AND Password = @Password') 
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

// async function postUser(username, password) {  
//     try {// ถ้าเกิด error จะเข้า catch
//     // Query
//     let data = await sql.connect(config) // sql connect to database
//         .then(pool => {
//             return pool.request()
//             .input('Username', sql.VarChar, username)  
//             .input('Password', sql.VarChar, password) 
//             .output('code', sql.NVarChar, 'success')
//             .query('SELECT * FROM Users WHERE Username = @Username AND Password = @Password') 
//         }).then(result => {// ผลลัพธ์ result
//             console.log(result)
//             return result  // return data result
//         }).catch(err => {  // ถ้าเกิด error จะเข้า catch
//             return err;  // return error
//         });
//     return data;  // return ค่ากลับ
//     }
//     catch (error){
//         console.log(error);
//     }
// }

module.exports = { postUser: postUser };