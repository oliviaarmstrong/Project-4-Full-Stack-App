import { findPlayerWithItem } from "../../db";

export default async function handler(req, res) {
    const { itemID } = req.body;

    try {
        const result = await findPlayerWithItem(itemID);
        res.status(200).json({ players: result });
    } catch (error) {
        res.status(500).json({ message: 'Error finding player with item', error: error.message });
    }
}