import { fetchBiomeWithSearchTerm } from "../../db";

export default async function handler(req, res) {
    const {searchTerm = ''} = req.query;
    
    try {
        const biomes = await fetchBiomeWithSearchTerm(searchTerm);
        res.status(200).json({
        biomes: biomes
        });
    } catch (error) {
        res.status(500).json({
        message: 'Error fetching biomes',
        error: error.message
        });
    }
    }