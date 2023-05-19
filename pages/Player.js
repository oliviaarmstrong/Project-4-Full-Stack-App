import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Player page
export default function Player() {
    const [player, setPlayer] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data from API
    const fetchData = async () => {
        // API endpoint
        const response = await fetch(`/api/searchPlayers?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        // Array of player objects
        setPlayer(data.players);
    };

    // Hook, executes fetchData function after component is rendered
    useEffect(() => {
        fetchData();
        // Dependency array, specifies values that the effect depends on
    }, [searchTerm]);

    const addPlayer = async () => {
        // Prompts user
        const playerID = prompt('Enter Player ID');
        const playerLevel = prompt('Enter Player Level');
        const playerExperience = prompt('Enter Player Experience');
        const gameID = prompt('Enter Game ID');
        const isOnline = prompt('Enter Is Online');
        const username = prompt('Enter Username');

        // Makes request to API server
        const response = await fetch('/api/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Convert into JSON string representation
            body: JSON.stringify({
                playerID: playerID,
                playerLevel: playerLevel,
                playerExperience: playerExperience,
                gameID: gameID,
                isOnline: isOnline,
                username: username
            }),
        });

        if (!response.ok) {
            alert('Error adding mob');
            return;
        }

        // Refresh the player list.
        fetchData();
    };

    const deletePlayer = async () => {
        const playerID = prompt('Enter Player ID');

        const response = await fetch('api/deletePlayer',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            playerID: playerID
            })

        });

        if (!response.ok) {
            alert('Error deleting Player');
            return;
        }

        // Refresh the player list.
        fetchData();

    }

    const updatePlayer = async () => {
        const playerID = prompt('Enter Player ID');
        const column = prompt('Enter column to update (Player_Level, player_experience, Game_ID, is_online, username)');
        const newValue = prompt('Enter new value');

        const response = await fetch('api/updatePlayer',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
            playerID: playerID,
            column: column,
            newValue: newValue
            })
        });

        if (!response.ok) {
            alert('Error updating mob');
            return;
        }

        // Refresh the player list.
        fetchData();

    }
    const logOnlinePlayers = async () => {
        const response = await fetch('/api/logOnlinePlayers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            alert('Error logging online players');
            return;
        }

        // Refresh the player list.
        fetchData();
    };


    const [inventory, setInventory] = useState([]);

    const viewInventory = async () => {
        const playerID = prompt('Enter Player ID');

        const response = await fetch('/api/viewInventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerID: playerID
            }),
        });

        if (!response.ok) {
            alert('Error viewing inventory');
            return;
        }

        // Get the inventory from the response and update the state
        const data = await response.json();
        setInventory(data.inventory);
    }

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <input
                    className="searchbar"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    />
                <button onClick={deletePlayer} className="deletePlayerButton">Delete Player</button>
                <button onClick={addPlayer} className="addPlayerButton">Add Player</button>
                <button onClick={updatePlayer} className="updatePlayerButton">Update Player</button>
                <button onClick={() => downloadCSV(player)}>Download Report</button>
                {/* <button onClick={logOnlinePlayers} className="logOnlinePlayersButton">Log Online Players</button> */}
                <button onClick={viewInventory}>View Inventory</button>
                <table>
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Usernames</th>
                            <th>Player Level</th>
                            <th>Player Experience</th>
                            <th>Game ID</th>
                            <th>Is Online</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate thorugh player array */}
                        {player.map((pl, index) => (
                            <tr key={index}>
                                <td>{pl.Player_ID}</td>
                                <td>{pl.username}</td>
                                <td>{pl.Player_Level}</td>
                                <td>{pl.player_experience}</td>
                                <td>{pl.Game_ID}</td>
                                <td>{pl.is_online}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {inventory.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Item_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
