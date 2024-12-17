const { Sequelize } = require("sequelize")
const Game = require("../models/Game")

const list = async (req, res) => {
    await Game.findAll({
        order: [
            ["id"]
        ],
        limit: 50
    })
    .then((data) => {
        res.render("index", { games: data, title: "Home", app: process.env.APP, description: process.env.DESCRIPTION })
    })
    .catch((error) => {
        console.log(error)
    })
}

const create = async (req, res) => {
    res.render("create", { title: "Register", app: process.env.APP, description: process.env.DESCRIPTION } )
}

const store = async (req, res) => {    
    const { gametitle, gameyear, multiplayer, platinum, details } = req.body
    try {
        let game = await Game.findOne({
            where: {
                gametitle: gametitle
            }
        })
        if(game === null) {
            game = await Game.create({ gametitle, gameyear, multiplayer, platinum, details })
            res.send({ game, errors: 0 })
        }
        else {
            res.send({ errors: 1 })
        }
    }
    catch(error) {
        console.log(error)
    }
}

const read = async (req, res) => {    
    try {
        const game = await Game.findOne({
            where: {
                id: req.params.id
            }
        })        
        if(game === null) {
            res.redirect("/")
        }
        else {
            res.render("edit", { game, title: "Edit", app: process.env.APP, description: process.env.DESCRIPTION })            
        }
    }
    catch(error) {        
        console.log(error)
    }
}

const show = async (req, res) => {    
    try {
        const game = await Game.findOne({
            where: {
                id: req.params.id
            }
        })        
        if(game === null) {
            res.redirect("/")
        }
        else {
            res.render("show", { game, title: "Show", app: process.env.APP, description: process.env.DESCRIPTION })            
        }
    }
    catch(error) {        
        console.log(error)
    }
}

const update = async (req, res) => {
    try {
        const { id, gametitle, gameyear, multiplayer, platinum, details } = req.body
        const game = await Game.findOne({
            where: {
                id: id
            }
        })
        if(game === null) {
            res.redirect("/")
        }
        else {
            game.gametitle = gametitle
            game.gameyear = gameyear
            game.multiplayer = multiplayer
            game.platinum = platinum
            game.details = details
            const saved = await game.save()
            if(saved === null) {
                res.send({ errors: 1 })
            }
            else {
                res.send({ errors: 0 })
            }
        }
    }
    catch(error) {
        console.log(error)
        res.send({ errors: 1 })
    }
}

const search = async (req, res) => {
    try {
        const search = req.params.search
        const orderSelected = req.params.order
        const Op = Sequelize.Op
        await Game.findAll({
            where: {
                gametitle: {
                    [Op.like]: "%" + search + "%"
                }
            },
            order: [
                [orderSelected]
            ]
        })
        .then((data) => {
            if(data.length > 0) {
                res.send({ games: data })
            }
            else {
                res.send({ games: null })
            }
        })
    }
    catch(error) {
        console.log(error)
    }
}

const destroy = async (req, res) => {
    const { id } = req.body 
    try {
        await Game.destroy({
            where: { id: id }
        })
        .then((data) => {               
            res.send({ errors: 0 })
        })
    }   
    catch(error){
        console.log(error)
        res.send({ errors: 1 })
    }
}

const notfound = async (req, res) => {
    res.status(404).render("404", { title: "404", app: process.env.APP, description: process.env.DESCRIPTION })
}

module.exports = {
    list,
    create,
    store,
    read,
    show,
    update,
    destroy,
    search,
    notfound
}