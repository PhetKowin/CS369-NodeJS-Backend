const express = require('express')    //ใช้ module express
const router = express.Router();  //ใช้ function router ของ express
const Db = require('../controller/auth') //import shipper ในตัวแปร Db
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken');

//http://localhost:8080/auth/login
router.route('/login').post((req, res) => {
    let user = { ...req.body } //ส่ง req.body เป็นข้อมูล json เข้าไปยังตัวแปร ship
    Db.postUser(user).then((data) => {    // เรียกใช้ functio
        if (data.output.code == 'success') //return data.codde กลับมาเป็น success
        {
            const token = jwt.sign({ id: data.recordset[0].UserID, name: data.recordset[0].Username }, 'cat', { expiresIn: '24h' });
            data.recordset[0].token = token;
            res.status(200).json({ data: data.recordset[0], message: 'success' });
        }
        else //return data เป็น error
        {
            res.status(400).send({ error: data.recordset[0], message: 'Bad Request' }) //จะส่ง http code 400 และแสดง error, message ในรูปแบบ json
        }
        // console.log(data);      
    }).catch(err => {
        res.status(500).send({ error: err, message: 'Server Error ' }) // ถ้า error จะส่ง http code 500
        // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
})

module.exports = router; 