import { pool } from '../../db/db.js'

export const getLists = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM db_game')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const getList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM db_game WHERE gm_id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({ message: 'Juego no encontrado' })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const createList = async (req, res) => {
    const {
        gm_name,
        gm_dev,
        gm_release,
        gm_device,
        gm_category,
        gm_price,
        gm_imageURL,
        gm_description,
    } = req.body
    try {
        const [rows] = await pool.query(
            'INSERT INTO db_game (gm_name, gm_dev, gm_release, gm_device, gm_category, gm_price, gm_imageURL, gm_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                gm_name,
                gm_dev,
                gm_release,
                gm_device,
                gm_category,
                gm_price,
                gm_imageURL,
                gm_description,
            ]
        )
        res.json({
            id: rows.insertId,
            gm_name,
            gm_dev,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const updateList = async (req, res) => {
    const { id } = req.params

    const {
        gm_name,
        gm_dev,
        gm_release,
        gm_device,
        gm_category,
        gm_price,
        gm_imageURL,
        gm_description,
    } = req.body
    try {
        const [result] = await pool.query(
            'UPDATE db_game SET gm_name = IFNULL(?, gm_name), gm_dev = IFNULL(?, gm_dev), gm_release = IFNULL(?, gm_release), gm_device = IFNULL(?, gm_device), gm_category = IFNULL(?, gm_category), gm_price = IFNULL(?, gm_price), gm_imageURL = IFNULL(?, gm_imageURL), gm_description = IFNULL(?, gm_description) WHERE gm_id = ?',
            [
                gm_name,
                gm_dev,
                gm_release,
                gm_device,
                gm_category,
                gm_price,
                gm_imageURL,
                gm_description,
                id,
            ]
        )

        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Juego no encontrado' })

        const [rows] = await pool.query('SELECT * FROM db_game WHERE gm_id=?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}

export const deleteList = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM db_game WHERE gm_id = ?', [req.params.id])
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Juego no encontrado' })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: 'Algo ha fallado' })
    }
}
