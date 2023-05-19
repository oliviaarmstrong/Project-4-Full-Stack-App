import { addPlayer } from '../../db';

export default async function handler(req, res) {
    const { playerID, playerLevel, playerExperience, gameID, isOnline, username } = req.body;

    try {
        const result = await addPlayer(playerID,playerLevel,playerExperience,gameID, isOnline, username);
        res.status(200).json({ message: 'Player added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding player', error: error.message });
    }
}
