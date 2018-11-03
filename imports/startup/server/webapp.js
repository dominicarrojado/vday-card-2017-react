import { Meteor } from 'meteor/meteor';
import { Cards } from '../../api/cards/cards.js';

WebApp.connectHandlers.use(
  '/',
  Meteor.bindEnvironment((req, res, next) => {
    const card = Cards.findOne(req.url.substr(1), {
      fields: { to: 1, from: 1, cover: 1 },
    });
    const { host } = req.headers;
    const currentDomain = `http${
      host !== 'localhost:3000' ? 's' : ''
    }://${host}`;
    let meta;

    if (card) {
      meta = `
            <meta property="og:title" content="Hey ${
              card.to
            }, you have a e-card from ${card.from}!">
            <meta property="og:description" content="Click the link to open - Tug at your special someone's heartstrings by making a cute e-card just for them.">
            <meta property="og:image" content="${currentDomain}/images/sharer/cover-${
        card.cover
      }.png">
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height" content="200" />
        `;
    } else {
      meta = `
            <meta property="og:title" content="To My Valentine | Hashtag Interactive">
            <meta property="og:description" content="Tug at your special someone's heartstrings by making a cute e-card just for them.">
            <meta property="og:image" content="${currentDomain}/images/sharer/hashtag-interactive-to-my-valentine.png">
            <meta property="og:image:width" content="1052" />
            <meta property="og:image:height" content="550" />
        `;
    }

    req.dynamicHead = (req.dynamicHead || '') + meta;

    return next();
  })
);
