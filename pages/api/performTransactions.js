import { performTransaction } from "../../db";

export default async function handler(req, res) {
    const { gameID, newGameID, worldSeed, difficulty, gameMode, response } = req.body;

    try {
        const result = await performTransaction(gameID, newGameID, worldSeed, difficulty, gameMode, response);
        res.status(200).json({ message: 'Transaction performed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error performing transaction', error: error.message });
    }
}