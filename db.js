
// Connection to database and execute SQL queries, exports functions

const mysql = require('mysql2/promise');

async function createConnection() {
  return await mysql.createConnection('mysql://a9ws7yvlukt4xjemw6sq:pscale_pw_Yr3aP4H8EsteIfepuSeI9SiS7T3mzf6O5r7sgdnQhwd@aws.connect.psdb.cloud/cpsc408finalassignment?ssl={"rejectUnauthorized":true}');
}

async function fetchGameSave() {
  const connection = await createConnection();
  const [rows] = await connection.execute('SELECT * FROM Game_Save');
  await connection.end();
  return rows;
}

async function fetchBiome() {
  const connection = await createConnection();
  const [rows] = await connection.execute('SELECT * FROM Biome');
  await connection.end();
  return rows;
}

async function fetchMob() {
  const connection = await createConnection();
  const [rows] = await connection.execute('SELECT * FROM Mob');
  await connection.end();
  return rows;
}

async function fetchPlayer() {
  const connection = await createConnection();
  const [rows] = await connection.execute('SELECT * FROM Player');
  await connection.end();
  return rows;
}

async function fetchItem() {
  const connection = await createConnection();
  const [rows] = await connection.execute('SELECT * FROM Items');
  await connection.end();
  return rows;
}

async function fetchInventory() {
  const connection = await createConnection();
  const [rows] = await connection.execute('SELECT * FROM Inventory');
  await connection.end();
  return rows;
}


async function addMob(mobId, mobDescription, health, strength) {
  const connection = await createConnection();
  const [result] = await connection.execute(
    'INSERT INTO Mob (Mob_ID, mob_description, health, strength) VALUES (?, ?, ?, ?)',
    [mobId, mobDescription, health, strength]
  );
  await connection.end();
  return result;
}

async function addGameSave (gameID, worldSeed, difficulty, gameMode) {
    const connection = await createConnection();
    const [result] = await connection.execute(
        'INSERT INTO Game_Save (game_ID, World_Seed, Difficulty, Game_Mode) VALUES (?, ?, ?, ?)',
        [gameID, worldSeed, difficulty, gameMode]
    );
    await connection.end();
    return result;
}

async function deleteMob(mobId) {
  const connection = await createConnection();
  const [result] = await connection.execute(
    'DELETE FROM Mob WHERE Mob_ID = ?',
    [mobId]
  );
  await connection.end();
  return result;
}

async function updateMob(mobId, column, newValue) {
  const connection = await createConnection();
  const query = `UPDATE Mob SET ${column} = ? WHERE Mob_ID = ?`;
  const [result] = await connection.execute(query, [newValue, mobId]);
  await connection.end();
  return result;
}

// Uses search term to fetch mobs with that search term
async function fetchMobsWithSearchTerm(searchTerm) {
  const connection = await createConnection();
  const query = `SELECT * FROM Mob WHERE Mob_ID LIKE ? OR mob_description LIKE ? OR health LIKE ? OR strength LIKE ?`;
  const params = Array(4).fill(`%${searchTerm}%`);
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows;
}

// Uses search term to fetch players with that search term
async function fetchPlayersWithSearchTerm(searchTerm) {
  const connection = await createConnection();
  const query = `SELECT * FROM Player WHERE Player_ID LIKE ? OR Player_Level LIKE ? OR player_experience LIKE ? OR Game_ID LIKE ?`;
  const params = Array(4).fill(`%${searchTerm}%`);
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows;
}

async function fetchGameSaveWithSearchTerm(searchTerm){
  const connection = await createConnection();
  const query = `SELECT * FROM Game_Save WHERE Game_ID LIKE ? OR World_Seed LIKE ? OR Difficulty LIKE ? OR Game_Mode LIKE ?`;
  const params = Array(4).fill(`%${searchTerm}%`);
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows;
}

async function fetchBiomeWithSearchTerm(searchTerm){
  const connection = await createConnection();
  const query = 'SELECT * FROM Biome WHERE Biome_ID LIKE ? OR tree_type LIKE?';
  const params = Array(2).fill(`%${searchTerm}%`);
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows;
}

async function fetchItemWithSearchTerm(searchTerm){
  const connection = await createConnection();
  const query = 'SELECT * FROM Items WHERE Item_ID LIKE ? OR Item_name LIKE? OR item_description LIKE ? OR is_placeable LIKE ? OR item_type LIKE ? OR damage LIKE ? OR health LIKE ? OR material LIKE ?';
  const params = Array(8).fill(`%${searchTerm}%`);
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows;
}

async function addPlayer(playerID,playerLevel,playerExperience,gameID, isOnline, username) {
  const connection = await createConnection();
  const query = 'INSERT INTO Player (Player_ID,Player_Level,player_experience,Game_ID,is_online,username) VALUES (?,?,?,?,?,?)';
  const [result] = await connection.execute(query, [playerID,playerLevel,playerExperience,gameID, isOnline, username]);
  await connection.end();
  return result;
}

async function addBiome(biomeId, treeType) {
  const connection = await createConnection();
  const query = 'INSERT INTO Biome (Biome_ID,tree_type) VALUES (?,?)';
  const [result] = await connection.execute(query, [biomeId, treeType]);
  await connection.end();
  return result;
}

async function deleteBiome(biomeId) {
  const connection = await createConnection();
  const query = 'DELETE FROM Biome WHERE Biome_ID = ?';
  const [result] = await connection.execute(query, [biomeId]);
  await connection.end();
  return result;
}


async function deletePlayer(playerID) {
  const connection = await createConnection();
  const query = 'DELETE FROM Player WHERE Player_ID = ?';
  const [result] = await connection.execute(query, [playerID]);
  await connection.end();
  return result;
}

async function updatePlayer(playerID,column,newValue) {
  const connection = await createConnection();
  const query = `UPDATE Player SET ${column} = ? WHERE Player_ID = ?`;
  const [result] = await connection.execute(query,[newValue,playerID]);
  await connection.end();
  return result;
}

async function deleteGameSave(gameID) {
  const connection = await createConnection();
  const query = 'DELETE FROM Game_Save WHERE Game_ID = ?';
  const [result] = await connection.execute(query, [gameID]);
  await connection.end();
  return result;
}

async function updateGameSave(gameID,column,newValue) {
  const connection = await createConnection();
  const query = `UPDATE Game_Save SET ${column} = ? WHERE Game_ID = ?`;
  const [result] = await connection.execute(query,[newValue,gameID]);
  await connection.end();
  return result;
}

async function addItem (itemID,itemName,itemDescription,isPlaceable,itemType,damage,health,material) {
  const connection = await createConnection();
  const query = 'INSERT INTO Items (Item_ID,Item_name,item_description,is_placeable,item_type,damage,health,material) VALUES (?,?,?,?,?,?,?,?)';
  const [result] = await connection.execute(query, [itemID,itemName,itemDescription,isPlaceable,itemType,damage,health,material]);
  await connection.end();
  return result;
}

async function deleteItem(itemID) {
  const connection = await createConnection();
  const query = 'DELETE FROM Items WHERE Item_ID = ?';
  const [result] = await connection.execute(query, [itemID]);
  await connection.end();
  return result;
}

async function updateItem(itemID, column, newValue) {
  const connection = await createConnection();

  // Add this check to make sure only damage, health, and material can be null
  if (newValue === null && (column !== "damage" && column !== "health" && column !== "material")) {
    throw new Error(`Cannot set ${column} to null`);
  }

  const query = `UPDATE Items SET ${column} = ? WHERE Item_ID = ?`;
  const [result] = await connection.execute(query, [newValue, itemID]);
  await connection.end();
  return result;
}

async function logOnlinePlayers() {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();

    // Get the online players
    const [players] = await connection.execute('SELECT Player_ID FROM Player WHERE is_online = 1');
    for (let player of players) {
      // Insert into the online log
      await connection.execute('INSERT INTO dbOnlineLog(player_ID, timeStamp) VALUES (?, NOW())', [player.Player_ID]);
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    await connection.end();
  }
}

async function performTransaction(gameID, newGameID, worldSeed, difficulty, gameMode) {
  const connection = await createConnection();
  try {
    // Start transaction
    await connection.beginTransaction();

    // Check if the game id exists
    const [rows] = await connection.execute('SELECT game_ID FROM Game_Save WHERE game_ID = ?', [gameID]);
    if (rows.length === 0) {
      throw new Error('Game ID does not exist');
    }

    // INSERT INTO Game_Save (game_ID, World_Seed, Difficulty, Game_Mode) VALUES (?, ?, ?, ?)
    await connection.execute('INSERT INTO Game_Save (game_ID, World_Seed, Difficulty, Game_Mode) VALUES (?, ?, ?, ?)', [newGameID, worldSeed, difficulty, gameMode]);

    // UPDATE Player SET game_ID = ? WHERE game_ID = ?
    await connection.execute('UPDATE Player SET game_ID = ? WHERE game_ID = ?', [newGameID, gameID]);

    // DELETE FROM Game_Save WHERE Game_ID = ?
    await connection.execute('DELETE FROM Game_Save WHERE Game_ID = ?', [gameID]);

    // Commit the transaction if all commands were successful
    await connection.commit();
  } catch (error) {
    console.error(error);

    // If any command fails, rollback the transaction to ensure data consistency
    await connection.rollback();
  } finally {
    // Close the connection whether the transaction was successful or not
    await connection.end();
  }
}

async function viewInventory(playerID){
  const connection = await createConnection();
  const query = 'SELECT iii.Item_name FROM Player p INNER JOIN Inventory i on p.Player_ID= i.Player_ID INNER JOIN Inventory_Items ii on i.Inventory_ID = ii.Inventory_ID INNER JOIN Items iii on ii.Item_ID = iii.Item_ID WHERE p.Player_ID =?;';
  const [result] = await connection.execute(query, [playerID]);
  await connection.end();
  return result;
}

async function findPlayerWithItem(itemName){
  const connection = await createConnection();
  const query = "SELECT p.Player_ID FROM Player p INNER JOIN Inventory i on i.Player_ID = p.Player_ID INNER JOIN Inventory_Items ii on i.Inventory_ID = ii.Inventory_ID INNER JOIN Items iii on ii.Item_ID = iii.Item_ID WHERE p.Game_ID = ? AND iii.Item_name = 'Wooden Sword' ORDER BY p.Player_ID ASC;";
  const [result] = await connection.execute(query, [itemName]);
  await connection.end();
  return result;
}

async function GetOnlinePlayerCountByGame(){
  const connection = await createConnection();
  const query = "SELECT gs.Game_ID, COALESCE(COUNT(p.Player_ID), 0) AS Online_Player_Count FROM Game_Save AS gs LEFT JOIN Player AS p ON gs.Game_ID = p.Game_ID AND p.is_online = 1 GROUP BY gs.Game_ID;";
  const [result] = await connection.execute(query);
  await connection.end();
  return result;
}

module.exports = { GetOnlinePlayerCountByGame, findPlayerWithItem, viewInventory, performTransaction, logOnlinePlayers, fetchItemWithSearchTerm, deleteBiome, addBiome, fetchGameSave, fetchBiome, fetchMob, fetchPlayer, fetchItem, fetchInventory, addMob, deleteMob, updateMob, fetchMobsWithSearchTerm, addPlayer, fetchPlayersWithSearchTerm, deletePlayer, updatePlayer, addGameSave, fetchGameSaveWithSearchTerm, deleteGameSave, updateGameSave, fetchBiomeWithSearchTerm, addItem, deleteItem, updateItem };


