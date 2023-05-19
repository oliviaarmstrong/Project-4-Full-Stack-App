import {addGameSave} from '../../db';

export default async function handler(req, res) {
    const {gameID, worldSeed, difficulty, gameMode} = req.body;

    try {
        const result = await addGameSave(gameID, worldSeed, difficulty, gameMode);
        res.status(200).json({message: 'Game Save added successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error adding game save', error: error.message});
    }
}