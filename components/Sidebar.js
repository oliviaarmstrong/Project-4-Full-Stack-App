// components/Sidebar.js
import Link from 'next/link';

// Sidebar component, contains link to each item
const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link href="/GameSave"><div className = "sidebar-item">GAME SAVE</div></Link>
            <Link href="/Biome"><div className = "sidebar-item">BIOME</div></Link>
            <Link href="/Mob"><div className = "sidebar-item">MOB</div></Link>
            <Link href="/Player"><div className = "sidebar-item">PLAYER</div></Link>
            <Link href="/Items"><div className = "sidebar-item">ITEMS</div></Link>
            <Link href="/Inventories"><div className = "sidebar-item">INVENTORY</div></Link>
        </div>
    );
};

export default Sidebar;
