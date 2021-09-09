const router = require('express').Router();

const ContactController = require('../controllers/contact.controller');

router.get('/', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const search = req.query.search || null;
  ContactController.listContacts({ page, limit, search })
    .then((d) => res.json(d))
    .catch((e) => {
      res.json(e);
    });
});

router.post('/', (req, res) => {
  ContactController.saveContact(req.body)
    .then((d) => res.json(d))
    .catch((e) => {
      res.json(e);
    });
});

router.get('/:id', (req, res) => {
  ContactController.getById(req.params.id)
    .then((d) => res.json(d))
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;
