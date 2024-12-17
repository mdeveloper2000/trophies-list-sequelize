const express = require("express")
const gameController = require("../controllers/gameController")
const router = express.Router()

router.get("/", gameController.list)
router.get("/create", gameController.create)
router.post("/store", gameController.store)
router.get("/game/:id", gameController.read)
router.get("/game/show/:id", gameController.show)
router.put("/update", gameController.update)
router.delete("/destroy", gameController.destroy)
router.get("/search/:search/:order", gameController.search)
router.all("*", gameController.notfound)

module.exports =  {
    router
}