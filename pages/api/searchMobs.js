// pages/api/searchMobs.js
import { fetchMobsWithSearchTerm } from '../../db';

export default async function handler(req, res) {
    const { searchTerm = '' } = req.query;

    try {
        const mobs = await fetchMobsWithSearchTerm(searchTerm);
        res.status(200).json({ mobs: mobs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mobs', error: error.message });
    }
}
