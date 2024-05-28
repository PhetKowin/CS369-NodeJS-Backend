const config = require('../sqlconfig');  //ดึงข้อมูล connection จาก sqlconfig.js
const sql = require('mssql');   // ใช้ module sql

async function getShip() {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request().query('SELECT * FROM Products ') // ส่ง Query select เรียกดูข้อมูล Shippers
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function getShipByID(id) {  //รับ Parameter id
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ProductID', sql.Int, id)  // input id เข้าไปในตัวแปริ  ShipperID
            .query('SELECT * FROM Products WHERE ProductID = @ProductID') // ส่ง Query select ด้วยการ Where ShipperID
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function postShip(item) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ProductName', sql.VarChar, item.ProductName)  
            .input('ProductImage', sql.VarChar, item.ProductImage)  
            .input('ProductPrice', sql.Decimal, item.ProductPrice)  
            .input('ProductDetail', sql.VarChar, item.ProductDetail)  
            .input('ProductSize', sql.VarChar, item.ProductSize)  
            .input('ProductMaterial', sql.VarChar, item.ProductMaterial)  
            .output('name', sql.VarChar, item.ProductName)  //output name เป็น type NVarChar
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('INSERT INTO Products (ProductName, ProductImage, ProductPrice, ProductDetail, ProductSize, ProductMaterial) VALUES (@ProductName, @ProductImage, @ProductPrice, @ProductDetail, @ProductSize, @ProductMaterial)') 
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function putShip(item, id) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ShipperID', sql.Int, id)  //input ShipperID เป็น type Int
            .input('CompanyName', sql.NVarChar, item.CompanyName)  //input CompanyName เป็น type NVarChar
            .input('Phone', sql.NVarChar, item.Phone)  //input Phone เป็น type NVarChar
            .output('id', sql.Int, id)  //output id เป็น type Int
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('UPDATE Shippers SET CompanyName =@CompanyName, Phone= @Phone WHERE ShipperID=@ShipperID') // ส่ง Query UPDATE ไปที่ตาราง Shippers ตามที่ shipperid ที่ได้รับมา     }).then(result => {// ผลลัพธ์ result
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function deleteShip(id) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    console.log(id);
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ShipperID', sql.Int, id)  //input ShipperID เป็น type Int
            .output('id', sql.Int, id)  //output id เป็น type Int
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('DELETE from Shippers WHERE ShipperID=@ShipperID') // ส่ง Query DELETE ไปที่ตาราง Shippers ตามที่ได้รับshipperidมา
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}
module.exports = { getShip:getShip, getShipByID:getShipByID, postShip:postShip, putShip:putShip, deleteShip:deleteShip };
