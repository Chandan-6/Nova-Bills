import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import signup from "./routes/Signup/signup.js";
import login from "./routes/Login/login.js";
import Verification from "./routes/Verification/sendOTP.js";
import Authentication from "./middleware/Auth.js";
import getProfileData from "./routes/Profile/getProfileData.js";
import updateProfile from "./routes/Profile/updateProfile.js";
import invoiceRoute from "./routes/Invoice/Add/invoice.js";
// import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req,res)=>{
    res.status(200).json({message : "NovaBills is a Invoice generator."});
})
app.use(signup);
app.use(login);
app.use(Verification);
app.use(Authentication, getProfileData);
app.use(Authentication, updateProfile);
app.use(Authentication, invoiceRoute);

// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

