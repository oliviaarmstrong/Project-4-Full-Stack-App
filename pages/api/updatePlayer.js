import { updatePlayer } from '../../db';

// Handles API endpoint, processes request
export default async function handler(req, res) {
    // Extracts values from request 
    const { playerID, column, newValue } = req.body;

    try {
        // Passes extracted values as parameters to updatePlayer
        const result = await updatePlayer(playerID, column, newValue);
        res.status(200).json({ message: 'Player Updated Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Player', error: error.message });
    }
}