const express = require('express')    //ใช้ module express
const router = express.Router();  //ใช้ function router ของ express
const Db = require('../controller/auth') //import shipper ในตัวแปร Db
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    console.log('middleware');
    next();
});

// //http://localhost:8080/auth/login
// router.route('/login').post((req, res) => {
//     Db.getUserByUsername(req).then((data) => {
//         // console.log(data);      
//         res.status(200).json({ data: data, message: 'Login success' });  // ส่ง http code 200 และแสดง data
//         // message ในรูปแบบ json
//     }).catch(err => {
//         res.status(500).send({ error: err, message: 'Server Error ' }) // ถ้า error จะส่ง http code 500
//         // และแสดง err, message ในรูปแบบ json
//         console.log(err);
//     });
// })

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

// router.post('/login', (req, res, next) => {

//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         if (err) return next(err)
//         if(user) {
//             const token = jwt.sign(user, 'your_jwt_secret')
//             return res.json({user, token})
//         } else {
//             return res.status(422).json(info)
//          }
//     })(req, res, next);
// });

// passport.use(new LocalStrategy((username, password, done) => {
//     Db.postUser(username, password).then((data) =>{
//         if (data.output.code == 'success') //return data.codde กลับมาเป็น success
//         {
//             user = data.recordset[0]
//             return done(null,user)
//         }
//         else //return data เป็น error
//         {
//             return done(null, false, { message: 'Invalid credentials.\n' });
//         }
//         // console.log(data);      
//     }).catch(err => {
//         done(error);
//         // และแสดง err, message ในรูปแบบ json
//         console.log(err);
//     });
// }))

        //     authUser = (user, password, done) => {
        //         let authenticated_user = { id: data.recordset[0].UserID, name: data.recordset[0].Username} 
        //         return done (null, authenticated_user ) 
        // }
        // passport.use(new LocalStrategy (authUser))
        // passport.serializeUser( (user, done) => { 
        //     console.log(`--------> Serialize User`)
        //     console.log(user)     
        //     done(null, user.id)
        // } )
module.exports = router; 