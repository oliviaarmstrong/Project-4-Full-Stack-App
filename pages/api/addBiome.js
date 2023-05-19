import { addBiome } from "../../db";

export default async function handler(req, res) {
    const { biomeId, treeType } = req.body;

    try {
        const result = await addBiome(biomeId, treeType);
        res.status(200).json({ message: 'Biome added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding biome', error: error.message });
    }
}