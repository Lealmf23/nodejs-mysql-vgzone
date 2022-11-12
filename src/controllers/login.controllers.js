import { pool } from '../../db/db.js'

export const loginApp = async (req, res) => {
    const { us_user, us_password } = req.body
    try {
        const [rows] = await pool.query(
            'SELECT * FROM db_user WHERE us_user = ? AND us_password = ?',
            [us_user, us_password]
        )
        if (rows.length <= 0) return res.status(400).send('Usuario no existe')
        res.status(200).send({ id: rows[0].us_id, user: rows[0].us_user, rol: rows[0].us_rol })
    } catch (error) {
        return res.status(500).send(error)
    }
}
