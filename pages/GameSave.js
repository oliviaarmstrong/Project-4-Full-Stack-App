import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Gamesave Page
export default function GameSave() {
    const [gameSaves, setGameSaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data
    const fetchData = async () => {
        const response = await fetch(`/api/searchGameSave?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        // Array of mob objects
        setGameSaves(data.gamesave);
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    const addGameSave = async () => {
        const gameID = prompt('Enter Game ID');
        const worldSeed = prompt('Enter World Seed');
        const difficulty = prompt('Enter Difficulty');
        const gameMode = prompt('Enter Game Mode');

        const response = await fetch('/api/addGameSave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameID: gameID,
                worldSeed: worldSeed,
                difficulty: difficulty,
                gameMode: gameMode
            }),
        });

        if (!response.ok) {
            alert('Error adding game save');
            return;
        }

        // Refresh the game save list.
        fetchData();
    };

    const deleteGameSave = async () => {
        const gameID = prompt('Enter Game ID to delete');

        const response = await fetch('/api/deleteGameSave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameID: gameID,
            }),
        });

        if (!response.ok) {
            alert('Error deleting game save: ' + response.statusText);
            return;
        }

        // Refresh the game save list.
        fetchData();
    };

    const updateGameSave = async () => {
        const gameID = prompt('Enter Game ID to update');
        const column = prompt('Enter column to update (World_Seed, Difficulty, Game_Mode)');
        const newValue = prompt('Enter new value');

        const response = await fetch('/api/updateGameSave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameID: gameID,
                column: column,
                newValue: newValue
            }),
        });

        if (!response.ok) {
            alert('Error updating game save: ' + response.statusText);
            return;
        }

        // Refresh the game save list.
        fetchData();
    };

    function downloadCSV (data) {
        const csvData = data.map(row => Object.values(row).join(','));
        const csvRows = csvData.join('\n');
        const csvBlob = new Blob([csvRows], { type: 'text/csv' });
        const blobUrl = URL.createObjectURL(csvBlob);
        const anchorElement = document.createElement('a');

        anchorElement.href = blobUrl;
        anchorElement.download = 'gameSave.csv';
        anchorElement.click();

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
        }, 500);
    }

    const performTransactions = async () => {
        const gameID = prompt('Enter the old Game ID');
        const newGameID = prompt('Enter the new Game ID');
        const worldSeed = Math.floor(Math.random() * 1000000000);
        const difficulty = prompt('Enter Difficulty');
        const gameMode = prompt('Enter Game Mode');
        const response = await fetch('/api/performTransactions', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameID: gameID,
                newGameID: newGameID,
                worldSeed: worldSeed,
                difficulty: difficulty,
                gameMode: gameMode
            }),
        });

        if (!response.ok) {
            alert('Error performing transactions');
            return;
        }

        // Refresh the game save list
        fetchData();
    };

    const [onlinePlayerCount, setOnlinePlayerCount] = useState([]);
    const [showTable, setShowTable] = useState(false);


    const GetOnlinePlayerCountByGame = async () => {
        const response = await fetch('/api/GetOnlinePlayerCountByGame');
        const data = await response.json();

        setOnlinePlayerCount(data.count);
    };

    useEffect(() => {
        GetOnlinePlayerCountByGame();
    }, []);

    const handleButtonClick = () => {
        if (!showTable) {
            GetOnlinePlayerCountByGame();
        }
        setShowTable(!showTable);
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button onClick={addGameSave} className="btn btn-primary">Add Game Save</button>
                <button onClick={deleteGameSave} className="btn btn-primary">Delete Game Save</button>
                <button onClick={updateGameSave} className="btn btn-primary">Update Game Save</button>
                <button onClick={performTransactions} className="btn btn-primary">Perform Transactions</button>
                <button onClick={() => downloadCSV(gameSaves)} className="btn btn-primary">Download CSV</button>
                <button onClick={handleButtonClick}>{showTable ? "Hide Online Players" : "Show Online Players"}</button>
                <table>
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>World Seed</th>
                            <th>Difficulty</th>
                            <th>Game Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate through game saves array */}
                        {gameSaves.map((gs, index) => (
                            <tr key={index}>
                                <td>{gs.Game_ID}</td>
                                <td>{gs.World_Seed}</td>
                                <td>{gs.Difficulty}</td>
                                <td>{gs.Game_Mode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showTable && (
                    <table>
                        <thead>
                            <tr>
                                <th>Game ID</th>
                                <th>Online Player Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onlinePlayerCount.map((op, index) => (
                                <tr key={index}>
                                    <td>{op.Game_ID}</td>
                                    <td>{op.Online_Player_Count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
            </div>
        </div>
    );
}
