import { updateItem } from "../../db";

export default async function handler(req, res) {
    const {Item_ID, column, value} = req.body;

    try {
        const result = await updateItem(Item_ID, column, value);
        res.status(200).json({message: 'Item updated successfully'});
    }
    catch (error) {
        res.status(500).json({message: 'Error updating item', error: error.message});
    }
}
