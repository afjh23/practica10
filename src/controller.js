import { pool } from './config/db.js'
// mostrar todos los registros
export const getAll = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM users')
  return res.json(result)
}

export const getAllById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.query('SELECT * FROM users WHERE user_id=?', [id])
  return res.json(result)
}

// crear usuario
export const create = async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  try {
    const { nombre, email, password, roleId } = req.body
    const imagenPerfil = req.file.filename
    console.log(imagenPerfil)
    const [result] = await pool.execute('INSERT INTO users(nombre, email, password, role_id, imagen_perfil) VALUES(?, ?, ?, ?, ?)',
      [nombre, email, password, roleId, imagenPerfil]
    )
    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'Hubo un error al crear el usuario' })
    }
    res.status(201).json({ message: 'Usuario guardado' })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}
// Eliminar
export const deleteById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM users WHERE user_id=?', [id])
  if (result.affectedRows === 1) {
    return res.json({ message: 'Fila Eliminada' })
  } else {
    return res.json({ message: 'No se pudo eliminar' })
  }
}
// Actualizar
export const update = async (req, res) => {
  console.log(req)
  try {
    const { id } = req.params
    const { nombre, email, password, roleId, imagenPerfil } = req.body
    if (!nombre || !email || !password || !roleId || !imagenPerfil) return res.status(400).json({ message: 'Faltan datos en  el formulario' })
    const [result] = await pool.execute('UPDATE users SET nombre=?, email=?, password=?, role_id=?, imagen_perfil=? WHERE user_id=?', [nombre, email, password, roleId, imagenPerfil, id])

    if (result.affectedRows !== 1 && result.insertId) {
      return res.status(500).json({ message: 'No se pudo actualizar el artista' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}
