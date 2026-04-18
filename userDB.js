const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');

function initUsersDB() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
  }
}

function getAllUsers() {
  initUsersDB();
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function createUser(email, password, name) {
  const users = getAllUsers();
  
  if (findUserByEmail(email)) {
    return { success: false, message: 'El email ya está registrado' };
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    name,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  
  return { success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
}

function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  
  if (!user) {
    return { success: false, message: 'Email no encontrado' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Contraseña incorrecta' };
  }

  return { success: true, user: { id: user.id, email: user.email, name: user.name } };
}

module.exports = {
  createUser,
  authenticateUser,
  findUserByEmail,
  initUsersDB
};
