// pages/api/databases.js
import { fetchGameSave, fetchBiome, fetchMob, fetchPlayer, fetchItem, fetchInventory } from '../../db';

// API endpoint to fetch data
export default async function handler(req, res) {
    try {
        const gameSaves = await fetchGameSave();
        const biomes = await fetchBiome();
        const mobs = await fetchMob();
        const players = await fetchPlayer();
        const items = await fetchItem();
        const inventories = await fetchInventory();

        res.status(200).json({ gameSaves: gameSaves, biomes: biomes, mobs: mobs, players: players, items: items, inventories: inventories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching databases', error: error.message });
    }
}
