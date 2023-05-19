import { GetOnlinePlayerCountByGame } from "../../db";

export default async function handler(req, res) {
    const count = await GetOnlinePlayerCountByGame();

    try {
        res.status(200).json({ count: count });
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting online player count', error: error.message });
    }
}