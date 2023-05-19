import { fetchGameSaveWithSearchTerm } from '../../db';

export default async function handler(req, res) {
    const { searchTerm = '' } = req.query;

    try {
        const gamesave = await fetchGameSaveWithSearchTerm(searchTerm);
        res.status(200).json({ gamesave: gamesave });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching game save', error: error.message });
    }
}
