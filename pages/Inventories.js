import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Inventories page
export default function Inventory() {
    const [inventory, setInventory] = useState([]);

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/databases');
            const data = await response.json();
            // Array of inventory objects
            setInventory(data.inventories);
        }
        fetchData();
    }, []);


    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <table>
                    <thead>
                        <tr>
                            <th>Inventory ID</th>
                            <th>Player ID</th>
                            <th>Inventory Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate through inventory array */}
                        {inventory.map((iv, index) => (
                            <tr key={index}>
                                <td>{iv.Inventory_ID}</td>
                                <td>{iv.Player_ID}</td>
                                <td>{iv.inventory_size}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
               
            </div>
        </div>
    );
}
