const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
// const {user} = require("../_helpers/role");
const User = db.User;

module.exports = {
    authenticate,
    getByUsername,
    addUser,
    getTeam,
    setPokemon
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getByUsername(username) {

    return await User.find({username:username});
}


async function addUser(userParam){
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const newTeam = [6];
    for (let i = 0; i < 6; i++){
        newTeam[i] = {
            name: "Placeholder",
            type: 0,
            move1: "Howl",
            move2: "Howl",
            move3: "Howl",
            move4: "Howl",
            sprite: "/assets/bulbasaur.webp",
            picture: "/assets/bulbasaur.png",
            level: 0,
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            spdef: 0,
            spatt: 0,
            strengths: 0,
            weaknesses: 0
        }
    }

    const newUser = {
        username: userParam.username,
        email: userParam.email,
        hash: "",
        role: userParam.role,
        team: newTeam
    }

    const user = new User(newUser);
    console.log(user);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function getTeam(userParam){
    //return await User.find({team: userParam.team});
    const user = await User.findOne({_id: userParam.username});
    const team = [];
    for (let i = 0; i < 6; i++){
        team[i] = {
            name: user.team[i].name,
            type: user.team[i].type,
            move1: user.team[i].move1,
            move2: user.team[i].move2,
            move3: user.team[i].move3,
            move4: user.team[i].move4,
            sprite: user.team[i].sprite,
            picture: user.team[i].picture,
            level: user.team[i].level,
            health: user.team[i].health,
            attack: user.team[i].attack,
            defense: user.team[i].defense,
            speed: user.team[i].speed,
            spdef: user.team[i].spdef,
            spatt: user.team[i].spatt,
            strengths: user.team[i].strengths,
            weaknesses: user.team[i].weaknesses
        }
    }
    console.log(team);
    return team;
}

async function setPokemon(values, username){
    await User.updateOne({_id: username}, {team: values})

    const user = await User.findOne({values: username});
    return user.team;
}
