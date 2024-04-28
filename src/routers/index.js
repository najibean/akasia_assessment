const { Router } = require('express')
const responseHandler = require('../helpers/responseHandler')
const VoucherController = require('../controllers/voucher.controller')

const router = Router()

router.get('/test', (req, res, next) => {
	responseHandler.success(res, 'Test router!')
})

router.post('/generate/uvc', VoucherController.create)
router.patch('/generate/uvc/:voucher_id', VoucherController.update)

module.exports = router
