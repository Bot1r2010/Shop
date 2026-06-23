const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);
app.use(auth);
app.use(router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ JSON Server + Auth → http://localhost:${PORT}`);
  console.log(`   POST /register — ro'yxatdan o'tish`);
  console.log(`   POST /login    — kirish`);
  console.log(`   GET  /products — mahsulotlar`);
});
