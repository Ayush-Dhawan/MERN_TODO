const mongoose = require('mongoose')
const express = require("express")

mongoose.connect('mongodb://127.0.0.1:27017/TODO-LIST').then(() => console.log("connection succesful"))