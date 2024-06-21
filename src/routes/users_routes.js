import { Router } from 'express'
import { getAll, create, deleteById, update, getAllById } from '../controller.js'
import { uploadFile } from '../multer.js'
const router = Router()

// RUTAS
router.get('/', getAll)
router.post('/', uploadFile.single('imagen'), create)
router.delete('/:id', deleteById)
router.put('/:id', update)
router.get('/:id', getAllById)

export default router
