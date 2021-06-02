"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const fields_1 = require("../../src/fields");
const userAgent_1 = require("../../src/fields/userAgent");
const User = new src_1.Generatable('user', [
    new fields_1.MongoObjectID('_id'),
    new fields_1.FirstName('firstName'),
    new fields_1.LastName('lastName'),
    new fields_1.Email('email'),
]);
const Session = new src_1.Generatable('session', [
    new fields_1.UUID('sessionID'),
    new fields_1.Date('createdAt', {
        past: true,
    }),
    new fields_1.LinkedField('userID', {
        obj: User,
        field: '_id',
    }),
    new userAgent_1.default('sessionUserAgent'),
]);
console.log(User.generate(5).map((v) => v.serialize(src_1.JSONSerializer)));
console.log(Session.generate(20).map((v) => v.serialize(src_1.JSONSerializer)));
