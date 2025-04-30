const express = require("express");
const bodyParser = require("body-parser");
const responseRouter = require("./routers/responseRouter");
// const ticketRouter = require("./routers/ticketRouter");
// const ticketTypeRouter=require("./routers/ticketTypeRouter");
const userRouter=require("./routers/userRouter");
const dotenv=require("dotenv")
const sendEmail = require("./routers/emailRouter")
dotenv.config()
const app = express();
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URL)
.then(() => console.log("Connected…")).catch(err => console.error("Connection failed…"))

app.use(bodyParser.json());
app.use("/Response", responseRouter);
// app.use("/Ticket", ticketRouter);
// app.use("/TicketType",ticketTypeRouter);
app.use("/User",userRouter);
app.use("/Email",sendEmail)


const cors = require("cors");
const nodemailer = require('nodemailer'); 

// const { createToken, verifyToken } = require("./Middleware/auth");

app.use(express.json()); // חובה כדי לפרסר JSON
app.use(cors());

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
