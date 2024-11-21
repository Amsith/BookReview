const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB  = require('./database/db');

// Import routes
const reviewRoute = require('./routes/reviewRoute'); 
const authenticationRoute = require('./routes/auththenticationRoute')

dotenv.config();

const app = express()

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())



// Use routes
app.use('/api', reviewRoute); // Mount routes at /api
app.use('/api', authenticationRoute)
// Connect DB
connectDB()



//Server
const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server running " + port)
})



