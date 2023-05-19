import { deleteBiome } from "../../db";

export default async function handler(req, res) {
    const { biomeId } = req.body;

    try {
        const result = await deleteBiome(biomeId);
        res.status(200).json({ message: 'Biome deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting biome', error: error.message });
    }
}
