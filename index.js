const express = require('express');
const session = require('express-session');
const db = require('./config/dbConfig');
const bodyParser = require('body-parser');

const port = 3000;
var path = require("path");
const app = express();

app.use(session({secret: 'esefsefsef'}));

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/', (req, res) => {
        const {login, password} = req.body;

        const query = "SELECT * FROM users WHERE username = ? AND password = ?";

        db.query(query, [login, password], (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                return res.status(500).send('Erro interno do servidor');
            } 
            
            if (results.length > 0) {
                const {email, full_name} = results[0];
                req.session.login = login;
                res.render('logado', { usuario: login, email, full_name});
            } else {
                res.render('index');
            }
        });
});

app.post('/registro', (req,res) => {
    const {username, password, email, full_name} = req.body;
    const query = "INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?);";
    
    db.query(query, [username, password, email, full_name], (err, results) => {
        if(err){
            console.error('Erro ao inserir dados no banco', err);
            return res.status(500).send("Erro interno do servidor");
        }
        res.redirect('/')
    });
});

app.get('/', (req, res) => {
    if (req.session.login){
        res.render('logado', {usuario: req.session.login});
    }else{
        res.render('index');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.error('Erro ao destruir a sessão', err);
            return res.status(500).send('Erro interno do servidor');
        }
        res.redirect('/');
    })
})

app.get('/registro', (req, res) => {
    res.render('registro');
});

app.listen(port, () => {
    console.log('servidor rodando');
});
