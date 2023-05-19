import { viewInventory } from "../../db";

export default async function handler(req, res) {
    const { playerID } = req.body;

    try {
        const result = await viewInventory(playerID);
        res.status(200).json({ inventory: result });
    } catch (error) {
        res.status(500).json({ message: 'Error viewing inventory', error: error.message });
    }
}
