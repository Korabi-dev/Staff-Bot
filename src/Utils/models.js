const { Schema, model } = require("mongoose")

var s = Schema({
    user: String,
    strikes: Number,
    onleave: Boolean,
    messages:{
        today: Number,
        all: Number,
        random: Number
    },
    suspended: Boolean,
    active: Number,
    inactive: Number,
    blacklisted: Boolean
})

exports.staff = model("staff", s)

s = Schema({
    last: Number,
    active: Boolean
})

exports.time = model("time", s)