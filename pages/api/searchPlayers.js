// pages/api/searchPlayers.js
import { fetchPlayersWithSearchTerm } from '../../db';

// processes request
export default async function handler(req, res) {
    // Extracts searchTerm from request query
    const { searchTerm = '' } = req.query;

    try {
// Passes extracted values
        const players = await fetchPlayersWithSearchTerm(searchTerm);
        res.status(200).json({ players: players });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching players', error: error.message });
    }
}
