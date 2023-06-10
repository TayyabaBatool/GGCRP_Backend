const express = require('express');
const http = require('http')
const socket =  require('socket.io')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config()

// // For Images
// const Grid = require('gridfs-stream');
// const upload = require("./routes/upload");



//MIDDILWARES
const app = express();
let server = http.createServer(app);
let io = socket(server);
app.use(express.urlencoded({ extended: false }))


app.use(bodyParser.json({limit: '400mb'}));
app.use(bodyParser.urlencoded({limit: '400mb', extended: true}));
app.use(express.json());

app.use(cors({
    origin: '*'
}))

const adminRoutes = require('./routes/adminRoutes')
const admissionRoutes = require('./routes/admissionRoutes')
const facultyRoutes = require('./routes/facultyRoutes')
const studentRoutes = require('./routes/studentRoutes')
const galleryRoutes = require('./routes/albumGalleryRoutes')
const examRoutes = require('./routes/examRoutes')
const homeRoutes = require('./routes/homeRoutes')


//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require('./config/passport')(passport)

app.use(morgan('dev'))

io.on('connection', (socket) => {
    socket.on('join room', ({room1, room2}) => {
        socket.join(room1)
        socket.join(room2)
    })
    socket.on("private message", (message) => {
        io.to(message.room).emit('new Message', {
            message: message.message,
            sender: message.sender
        });
   })
    socket.on('disconnect', function () {
        console.log('Socket disconnected');
    })
})


let _response = {}

//ROUTES
app.use('/api/admin', adminRoutes)
app.use('/api/admission', admissionRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/home', homeRoutes)


// // For images
// app.use("/file", upload);




// //Catching 404 Error
// app.use((req, res, next) => {
//     const error = new Error('Tay_INVALID ROUTE')
//     error.status = 404
//     next(error);
// })

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URL;

// //For images
// let gfs;
// const conn = mongoose.connection;


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    // _response.database = "Healthy"
    console.log("Database Connected Successfully")
    console.log("server Started on PORT", PORT)

    // //For images
    // gfs = Grid(conn.db, mongoose.mongo);
    // gfs.collection("photos");


}).catch((err) => {
    // _response.database = "Unhealthy"
    console.log(URI)
    console.log("Error in connecting to DataBase", err.message)
})



app.get("/",(req,res)=>{
    res.json("server start")
})


//// Commented this while deploying to Heroku to get server "start response" like video
// app.use('/',(req,res)=>{
//     res.status(200).json(_response)
// })


server.listen(PORT, ()=>{
    _response.server = "Healthy"
    console.log("Server Healthy")
})

// process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD
// "mongodb://127.0.0.1:27017/frontEndProject"



// Old URI
// mongodb://localhost:27017/GGCRW?readPreference=primary&appname=MongoDB%20Compass&ssl=false