const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const myrouter = require('./route/myroute')
const app = express();
const shiproute = require('./route/shippers_route')
const authroute = require('./route/auth_route')
const reportRouter = require('./route/report')
// const passport = require('passport');
// const session = require('express-session');
// const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.urlencoded({ extended: true })); // ใช้งาน bodyParser แบบ application/x-www-form-urlencoded  
/*ใช้ middleware ที่ชื่อว่า body-parser เพื่อทำการแปลงข้อมูลที่ส่งมากับคำขอ (request) จากรูปแบบของ URL-encoded data 
เป็นข้อมูลที่เป็นอ็อบเจกต์ (object) ในรูปแบบของ JavaScript เพื่อที่จะสามารถใช้งานข้อมูลดังกล่าวได้ง่ายขึ้นในแอปพลิเคชัน Express.js ของคุณ.
โดยทั่วไปแล้ว URL-encoded data คือข้อมูลที่ถูกส่งผ่านการส่งคำขอแบบ POST จากฟอร์ม HTML หรือผ่านการส่งคำขอแบบอื่นๆ 
ซึ่งข้อมูลจะถูกเข้ารหัสเป็น URL-encoded format ก่อนจะถูกส่งไปยังแอปพลิเคชัน Express.js ของคุณ.
การใช้ middleware body-parser ที่กำหนดค่า extended: true จะทำให้ Express.js สามารถแปลงข้อมูลในรูปแบบของ 
URL-encoded data ที่ซับซ้อน (nested object) ได้โดยอัตโนมัติ ซึ่งจะช่วยให้คุณสามารถใช้งานข้อมูลในรูปแบบที่เป็นโครงสร้างได้ง่ายขึ้น*/
app.use(bodyParser.json()); // ใช้งาน bodyParser แบบ json
app.use(cors());
app.use(myrouter);
app.use('/api', shiproute); // ระบุ route ชื่อ api เพื่่อป้องกันความสับสน ตอนเรียกหน้า page ซึ่งได้สร้าง link shipper_route.js ไว้แล้วที่
app.use('/auth', authroute);
app.use('/report', reportRouter);
// app.use(session({
//     secret: 'cat',
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy((username, password, done) => {
//     if (username == "admin" && password == "admin") {
//         user = {
//             _id: 1,
//             fname: "Anakin ",
//             lname: "Skywalker"
//         }
//         console.log('Correct Password.')
//         return done(null, user)
//     } else {
//         console.log('Incorrect password.')
//         return done(null, false, { message: 'Incorrect password.' })
//     }
// }))

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/user',
//     failureRedirect: '/login',
// }));

// app.get("/user", (req, res) => {
//     console.log(req.user);
//     res.send({ message: req.user });
// })

// app.get("/login", (req, res) => {
//     res.send({ message: "Error" });
// })


app.listen(8080, () => {
    console.log('Server running at http://localhost:8080')
})