import { pool } from '../../db/db.js'

export const getContacts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM db_contacto')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const getContact = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM db_contacto WHERE c_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({ message: 'Contanto no encontrado' })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const createContact = async (req, res) => {
    const { c_name, c_mail, c_subject, c_description } = req.body
    try {
        const [rows] = await pool.query(
            'INSERT INTO db_contacto (c_name,c_mail,c_subject,c_description) VALUES (?, ?, ?, ?)',
            [c_name, c_mail, c_subject, c_description]
        )
        res.json({
            id: rows.insertId,
            c_name,
            c_mail,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const deleteContact = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM db_contacto WHERE c_id = ?', [req.params.id])
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Contacto no encontrado' })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}
