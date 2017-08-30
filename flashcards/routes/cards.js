const express = require('express');
const router = express.Router();
const data = require('../data/flashcardData.json').data;
const cards = data.cards;

router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  const id = Math.floor((Math.random() * numberOfCards));
  res.redirect(`/cards/${id}`);
});

router.get('/:id', (req, res) => {
  const side = req.query.side;
  const id = req.params.id;

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const text = cards[id][side];
  const hint = cards[id].hint;
  const templateData = {id, text};

  if (side == 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side == 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

router.get('/', (req, res) => {
  var id = Math.floor((Math.random() * 4));
  res.redirect(`/:${id}?side=question`);
});

module.exports = router;
