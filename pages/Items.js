import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Items page
export default function Items() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data
    const fetchData = async () => {
        const response = await fetch(`/api/searchItems?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        // Array of mob objects
        setItems(data.item);
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    const addItem = async () => {
        const Item_ID = prompt('Enter Item ID');
        const Item_name = prompt('Enter Item Name');
        const item_description = prompt('Enter Item Description');
        const is_placeable = prompt('Enter Is Placeable');
        const item_type = prompt('Enter Item Type');
        const damage = prompt('Enter Damage') || null;
        const health = prompt('Enter Health') || null;
        const material = prompt('Enter Material') || null;

        const response = await fetch('/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Item_ID: Item_ID,
                Item_name: Item_name,
                item_description: item_description,
                is_placeable: is_placeable,
                item_type: item_type,
                damage: damage,
                health: health,
                material: material
            }),
        });

        if (!response.ok) {
            alert('Error adding item');
            return;
        }

        // Refresh the item list.
        fetchData();
    };

    const deleteItem = async () => {
        const Item_ID = prompt('Enter Item ID to delete');

        const response = await fetch('/api/deleteItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Item_ID: Item_ID,
            }),
        });

        if (!response.ok) {
            alert('Error deleting item');
            return;
        }

        // Refresh the item list.
        fetchData();
    };

    const updateItem = async () => {
        const Item_ID = prompt('Enter Item ID to update');
        const column = prompt('Enter column to update (Item_name, item_description, is_placeable, item_type, damage, health, material)');
        const value = prompt('Enter new value, enter "null" to set null');

        const response = await fetch('/api/updateItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Item_ID: Item_ID,
                column: column,
                value: value === "null" ? null : value
            }),
        });

        if (!response.ok) {
            alert('Error updating item');
            return;
        }

        // Refresh the item list.
        fetchData();
    };

    function downloadCSV(data) {
        const replacer = (key, value) => value === null ? '' : value;
        const header = Object.keys(data[0]);
        let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        csv = csv.join('\r\n');

        // Create a new Blob object using the text
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        // Create a link element
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Items.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const [player, setPlayer] = useState([]);

    const findPlayerWithItem = async () => {
        const itemID = prompt('Enter Item ID');

        const response = await fetch('/api/findPlayerWithItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemID: itemID
            }),
        });

        if (!response.ok) {
            alert('Error finding player with item');
            return;
        }

        // Get the players from the response and update the state
        const data = await response.json();
        if (data.players.length === 0) {
            alert('No players found with that item');
            return;
        }
        setPlayer(data.players);
    }


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
                <button onClick={addItem}>Add Item</button>
                <button onClick={deleteItem}>Delete Item</button>
                <button onClick={updateItem}>Update Item</button>
                <button onClick={() => downloadCSV(items)}>Download CSV</button>
                <button onClick={findPlayerWithItem}>Find Player With Item</button>
                <table>
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Is Placeable</th>
                            <th>Item Type</th>
                            <th>Damage</th>
                            <th>Health</th>
                            <th>Material</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate through items array */}
                        {items.map((it, index) => (
                            <tr key={index}>
                                <td>{it.Item_ID}</td>
                                <td>{it.Item_name}</td>
                                <td>{it.item_description}</td>
                                <td>{it.is_placeable}</td>
                                <td>{it.item_type}</td>
                                <td>{it.damage}</td>
                                <td>{it.health}</td>
                                <td>{it.material}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {player.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Player ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Iterate thorugh player array */}
                            {player.map((pl, index) => (
                                <tr key={index}>
                                    <td>{pl.Player_ID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
