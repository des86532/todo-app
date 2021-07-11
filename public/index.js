const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://bcpjuyttpgshkc:1189c628645624e73fda7f9f111f3aabd5c4ec93c47a6a0531225300b73b36c1@ec2-52-203-27-62.compute-1.amazonaws.com:5432/d9ncobj91nb737',
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 如果需要設定 cors
// const corsOptions = {
//   origin: [
//     'http://www.example.com',
//     'http://localhost:8080',
//   ],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

// database
const databaseName = 'todo_list';

// api 取得 新增 修改 刪除
app
  .get('/', (req, res) => res.send('hello world'))
  .get('/time', (req, res) => res.send('times'))
  .get('/todos', (req, res) => {
    client
    .query(`select * from ${databaseName}`)
    .then(todos => {
      res.send(todos.rows.map((item) => {
        return {
          id: parseInt(item.id),
          name: item.name,
          completed: item.completed,
        }
      }))
    })
    .catch(err => res.send('取得失敗'))
  })
  .post('/todos', (req, res) => {
    client
    .query(`insert into ${databaseName} values ('${req.body.name}')`)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => res.send('添加失敗'))
  })
  .put('/todos', (req, res) => {
    client
    .query(`update ${databaseName} set name='${req.body.name}' WHERE id='${req.body.id}';`)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => res.send('修改失敗'))
  })
  .delete('/todos/:id', (req, res) => {
    client
    .query(`delete from ${databaseName} where id = ${req.params.id};`)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => res.send('刪除失敗'))
  })
  .get('/delTodos', (req, res) => {
    client
    .query(`delete from ${databaseName}`)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send('刪除失敗'))
  })
  .listen(PORT, () => console.log(`Listening on port ${PORT}`))