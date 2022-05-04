const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        role: {type:String, required: true},
        team: {type: Array, required: true, items: {
                        name: {type: String, unique: true, required: true},
                        type: {type: Number, required: true},
                        move1: {type: String, required: true},
                        move2: {type: String, required: true},
                        move3: {type: String, required: true},
                        move4: {type: String, required: true},
                        sprite: {type: String, required: true},
                        picture: {type: String, required: true},
                        level: {type: Number, required: true},
                        health: {type: Number, required: true},
                        attack: {type: Number, required: true},
                        defense: {type: Number, required: true},
                        speed: {type: Number, required: true},
                        spdef: {type: Number, required: true},
                        spatt: {type: Number, required: true},
                        strengths: {type: Number, required: true},
                        weaknesses: {type: Number, required: true}
                }
        }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
