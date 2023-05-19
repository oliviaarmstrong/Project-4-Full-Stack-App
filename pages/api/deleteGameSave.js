import { deleteGameSave } from '../../db';

export default async function handler(req, res) {
    const { gameID } = req.body;

    try {
        const result = await deleteGameSave(gameID);
        res.status(200).json({ message: 'Game Save deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting game save', error: error.message });
    }
}