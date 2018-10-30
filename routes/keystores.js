const route = require('express').Router();
const path = require('path');
const { Validator } = require('express-json-validator-middleware');
const keystoremodel = require('../models/keyStoreModel');
const postKeystoresScema = require('../helpers/schemas/postKeystoresSchema');

const validator = new Validator({ allErrors: true });

route.post('/', validator.validate({ body: postKeystoresScema }), async (req, res) => {
  try {
    if (await keystoremodel.addKeystore(req.body.keystore, req.body.opt, req.body.ca)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

route.get('/', (req, res) => {
  res.json(keystoremodel.getKeystores());
});

route.get('/:id', (req, res) => {
  if (req.query.download) {
    try {
      res.download(path.join(__dirname, `../keystores/${req.params.id}.jks`), `${req.params.id}.jks`);
    } catch (err) {
      console.log(err);
    }
  } else {
    const keystore = keystoremodel.getKeystore(req.params.id);
    if (keystore) {
      res.json(keystore);
    } else {
      res.sendStatus(404);
    }
  }
});

route.delete('/:id', async (req, res) => {
  try {
    if (await keystoremodel.removeKeystore(req.params.id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (reason) {
    res.sendStatus(500);
  }
});

module.exports = route;
