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

s = Schema({
    user: String,
    warnings: []
})

exports.warns = model("warns", s)

s = Schema({
    current: Number,
    active: Boolean
})
exports.warnsid = model("warnsid", s)


s = Schema({
    tags: Array, 
    enabled: Boolean
})
exports.tags = model("tags", s)