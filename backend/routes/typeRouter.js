const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/typeController')
const CheckRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRoleMiddleware("ADMIN"), TypeController.create)
router.get('/', TypeController.getAll)

module.exports = router