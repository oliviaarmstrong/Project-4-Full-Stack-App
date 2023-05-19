import { addMob } from '../../db';

export default async function handler(req, res) {
    const { mobId, mobDescription, health, strength } = req.body;


    try {
        const result = await addMob(mobId, mobDescription, health, strength);
        res.status(200).json({ message: 'Mob added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding mob', error: error.message });
    }
}
