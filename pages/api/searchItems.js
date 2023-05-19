import { fetchItemWithSearchTerm } from "../../db";

export default async function handler(req, res) {
    const { searchTerm = '' } = req.query;

    try {
        const item = await fetchItemWithSearchTerm(searchTerm);
        res.status(200).json({ item: item });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
}