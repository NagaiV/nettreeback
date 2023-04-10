import express from 'express'

import { dataForm, saveNetwork, allNetworks } from '../controllers/index.js'

const router = express.Router()

router.get('/form', dataForm)
router.post('/saveNetwork', saveNetwork)
router.get('/allNetworks', allNetworks)

export default router
