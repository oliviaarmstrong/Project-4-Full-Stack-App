import { deletePlayer } from '../../db';

export default async function handler(req, res) {
    const { playerID } = req.body;

    try {
        const result = await deletePlayer(playerID);
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting player', error: error.message });
    }
}