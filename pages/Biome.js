import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Biome page
export default function Biome() {
    const [biome, setBiome] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data
    const fetchData = async () => {
        const response = await fetch(`/api/searchBiome?searchTerm=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        // Array of mob objects
        setBiome(data.biomes);
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    const addBiome = async () => {
        const biomeId = prompt('Enter Biome ID');
        const treeType = prompt('Enter Tree Type');

        const response = await fetch('/api/addBiome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                biomeId: biomeId,
                treeType: treeType
            }),
        });

        if (!response.ok) {
            alert('Error adding biome');
            return;
        }
        
        // Refresh the biome list.
        fetchData();
    };

    const deleteBiome = async () => {
        const biomeId = prompt('Enter Biome ID to delete');

        const response = await fetch('/api/deleteBiome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                biomeId: biomeId,
            }),
        });

        if (!response.ok) {
            alert('Error deleting biome');
            return;
        }

        // Refresh the biome list.
        fetchData();
    };



    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={addBiome}>Add Biome</button>
                <button onClick={deleteBiome}>Delete Biome</button>
                <table>
                    <thead>
                        <tr>
                            <th>Biome ID</th>
                            <th>Tree Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate through biome array */}
                        {biome.map((be, index) => (
                            <tr key={index}>
                                <td>{be.Biome_ID}</td>
                                <td>{be.tree_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
