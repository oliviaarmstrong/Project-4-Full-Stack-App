// pages/api/updateMob.js
import { updateMob } from '../../db';

export default async function handler(req, res) {
    const { mobId, column, newValue } = req.body;

    try {
        const result = await updateMob(mobId, column, newValue);
        res.status(200).json({ message: 'Mob updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating mob', error: error.message });
    }
}
