import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true,
        },
        companyName : {
            required : true,
            type : String,
        },
        password : {
            required : true,
            type : String,
        },
        fullName : {
            type : String,
        },
        address : {
            type : String,
        },
        city : {
            type : String,
        },
        pincode : {
            type : String,
        },
        state : {
            type : String,
        },
        phoneNumber : {
            type : Number,
        },
        bankName : {
            type : String,
        },
        accountName : {
            type : String,
        },
        accountNumber : {
            type : Number,
        },
    },
    {
        timestamps: true,
    }
);

export default model('User', userSchema);