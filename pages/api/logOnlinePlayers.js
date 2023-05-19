import { logOnlinePlayers } from '../../db';

export default async function handler(req, res) {
    try {
        const result = await logOnlinePlayers();
        res.status(200).json({ message: 'Online players logged successfully' });
    } catch (error) {
        console.error(error);  // Print error stack trace
        res.status(500).json({ message: 'Error logging online players', error: error.message });
    }
}
