let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//  статика
app.use(express.static('public'));
//  шаблонизатор
app.set('view engine', 'hbs');
// отправка формы
const mysql = require("mysql2");
const pool = mysql.createPool({
   connectionLimit: 5,
   host: "localhost",
   user: "root",
   database: "usersdb2",
   password: "1467938-",
   dateStrings: "date"
});

app.set("view engine", "hbs");

// получение списка пользователей
app.get("/", function (req, res) {
   pool.query("SELECT * FROM users", function (err, data) {
      if (err) return console.log(err);
      res.render("index.hbs", {
         users: data
      });
   });
});
// возвращаем форму для добавления данных
app.get("/create", function (req, res) {
   res.render("create.hbs");
});
// получаем отправленные данные и добавляем их в БД 
app.post("/create", urlencodedParser, function (req, res) {

   if (!req.body) return res.sendStatus(400);
   const name = req.body.name;
   const article = req.body.article;
   const price = req.body.price;
   const photo = req.body.photo;
   const date = req.body.date;
   pool.query("INSERT INTO users (name, article, price, photo, date) VALUES (?,?,?,?,?)", [name, article, price, photo, date], function (err, data) {
      if (err) return console.log(err);
      res.redirect("/");
   });
});

// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/edit/:id", function (req, res) {
   const id = req.params.id;
   pool.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
      if (err) return console.log(err);
      res.render("edit.hbs", {
         user: data[0]
      });
   });
});
// получаем отредактированные данные и отправляем их в БД
app.post("/edit", urlencodedParser, function (req, res) {

   if (!req.body) return res.sendStatus(400);
   const price = req.body.price;
   const id = req.body.id;

   pool.query("UPDATE users SET price=? WHERE id=?", [price, id], function (err, data) {
      if (err) return console.log(err);
      res.redirect("/");
   });
});

// получаем id удаляемого пользователя и удаляем его из бд
app.post("/delete/:id", function (req, res) {

   const id = req.params.id;
   pool.query("DELETE FROM users WHERE id=?", [id], function (err, data) {
      if (err) return console.log(err);
      res.redirect("/");
   });
});

app.listen(3000, function () {
   console.log("Сервер ожидает подключения...");
});

