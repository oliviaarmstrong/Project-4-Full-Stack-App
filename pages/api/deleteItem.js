import { deleteItem } from "../../db";

export default async function handler(req, res) {
    const { Item_ID } = req.body;

    try {
        const result = await deleteItem(Item_ID);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
}