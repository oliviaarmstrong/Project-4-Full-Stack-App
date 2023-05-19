import { addItem } from "../../db";

export default async function handler(req, res) {
    const { Item_ID, Item_name, item_description, is_placeable, item_type, damage, health, material } = req.body;

    try {
        const result = await addItem(Item_ID, Item_name, item_description, is_placeable, item_type, damage, health, material);
        res.status(200).json({ message: 'Item added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding item', error: error.message });
    }
}