import { updateGameSave } from '../../db';

export default async function handler(req, res) {
    const { gameID, column, newValue } = req.body;

    try {
        const result = await updateGameSave(gameID, column, newValue);
        res.status(200).json({ message: 'Game Save updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating game save', error: error.message });
    }
}
