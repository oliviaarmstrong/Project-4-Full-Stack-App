// pages/api/deleteMob.js
import { deleteMob } from '../../db';

export default async function handler(req, res) {
    const { mobId } = req.body;
    
    try {
        const result = await deleteMob(mobId);
        res.status(200).json({ message: 'Mob deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mob', error: error.message });
    }
}
