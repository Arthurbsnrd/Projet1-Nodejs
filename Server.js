const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');


const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = mariadb.createPool({
    host : '127.0.0.1',
    database : 'nodejs1',
    user : 'root',
    password : '',
});  


// Routes pour l'entité Utilisateur
app.post('/users', (req, res) => {
  const newUser = req.body;
  db.query('INSERT INTO utilisateur SET ?', newUser, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Utilisateur créé avec succès', userId: result.insertId });
  });
});

app.get('/users', async (req, res) => {
    const db = await pool.getConnection();
    const rows = await db.query('SELECT * FROM utilisateur')
    res.json(rows);
});

// Routes pour l'entité Commentaire
app.post('/comments', (req, res) => {
  const newComment = req.body;
  db.query('INSERT INTO commentaire SET ?', newComment, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Commentaire ajouté avec succès', commentId: result.insertId });
  });
});

app.get('/comments/:technology', (req, res) => {
  const technology = req.params.technology;
  db.query('SELECT * FROM commentaire WHERE technologie = ?', technology, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Routes pour l'entité Technologie
app.post('/technologies', (req, res) => {
  const newTechnology = req.body;
  db.query('INSERT INTO technologie SET ?', newTechnology, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Technologie ajoutée avec succès', technologyId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
