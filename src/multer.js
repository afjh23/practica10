import multer from 'multer'

const storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const { nombre } = req.body
    const cNombre = nombre.replace(/\s/g, '').toLowerCase()
    const extension = file.originalname.split('.').pop()
    const newName = cNombre + '.' + extension
    cb(null, newName)
  }
})

const filterFile = (req, file, cb) => {
  const { mimetype } = file
  const permitidos = ['image/png', 'image/jpeg']
  if (permitidos.includes(mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Solo se aceptan imagenes'), false)
  }
}

export const uploadFile = multer({ storage: storageFiles, fileFilter: filterFile })
