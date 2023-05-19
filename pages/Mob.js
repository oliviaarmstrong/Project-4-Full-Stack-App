import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Mob page
export default function Mob() {
    const [mob, setMob] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data
    const fetchData = async () => {
        // API endpoint
        const response = await fetch(`/api/searchMobs?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        // Array of mob objects
        setMob(data.mobs);
    };

    // Hook, executes fetchData function after component is rendered
    useEffect(() => {
        fetchData();
        // Dependency array, specifies values that the effect depends on
    }, [searchTerm]);

    const addMob = async () => {
        // Prompts user
        const mobId = prompt('Enter Mob ID');
        const mobDescription = prompt('Enter Mob Description');
        const health = prompt('Enter Health');
        const strength = prompt('Enter Strength');

        // Makes request to API server
        const response = await fetch('/api/addMob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Convert into JSON string representation, transmits data between server and web app
            body: JSON.stringify({
                mobId: mobId,
                mobDescription: mobDescription,
                health: health,
                strength: strength
            }),
        });

        if (!response.ok) {
            alert('Error adding mob');
            return;
        }

        // Refresh the mob list.
        fetchData();
    };

    const deleteMob = async () => {
        const mobId = prompt('Enter Mob ID to delete');

        const response = await fetch('/api/deleteMob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobId: mobId,
            }),
        });

        if (!response.ok) {
            alert('Error deleting mob');
            return;
        }

        // Refresh the mob list.
        fetchData();
    };

    const updateMob = async () => {
        const mobId = prompt('Enter Mob ID to update');
        const column = prompt('Enter column to update (Mob_ID, mob_description, health, strength)');
        const newValue = prompt('Enter new value');

        const response = await fetch('/api/updateMob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobId: mobId,
                column: column,
                newValue: newValue,
            }),
        });

        if (!response.ok) {
            alert('Error updating mob');
            return;
        }

        // Refresh the mob list.
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
        link.setAttribute('download', 'report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                <button className="delete" onClick={deleteMob}>Delete Mob</button>
                <button onClick={addMob} className="btn btn-primary">Add Mob</button>
                <button className="btn btn-warning" onClick={updateMob}>Update Mob</button>
                <button onClick={() => downloadCSV(mob)}>Download Report</button>
                <table>
                    <thead>
                        <tr>
                            <th>Mob ID</th>
                            <th>Mob Description</th>
                            <th>Health</th>
                            <th>Strength</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate through mob array */}
                        {mob.map((mb, index) => (
                            <tr key={index}>
                                <td>{mb.Mob_ID}</td>
                                <td>{mb.mob_description}</td>
                                <td>{mb.health}</td>
                                <td>{mb.strength}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

