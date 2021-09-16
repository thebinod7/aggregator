const router = require('express').Router();
const isOnline = require('is-online');

const UserController = require('../controllers/user.controller');

router.get('/', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const search = req.query.search || null;
  UserController.listUsers({ page, limit, search })
    .then((d) => res.json(d))
    .catch((e) => {
      res.json(e);
    });
});

router.get('/check-internet', async (req, res) => {
  const online = await isOnline();
  console.log({ online });
  res.json({ online });
});

router.post('/', (req, res) => {
  UserController.saveUser(req.body)
    .then((d) => res.json(d))
    .catch((e) => {
      res.json(e);
    });
});

router.get('/:id', (req, res) => {
  UserController.getById(req.params.id)
    .then((d) => res.json(d))
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;
