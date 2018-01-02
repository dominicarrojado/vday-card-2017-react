import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';

import { Cards } from './cards.js';
import isStringEmpty from '../../utils/is-string-empty.js';

Meteor.methods({
    createCardItem(data) {
        if (!Match.test(data, {
                cover: String,
                to: String,
                from: String,
                message: String,
                createdBy: String,
            })) {
            throw new Meteor.Error('not-valid', 'Data is not valid.');
        }

        const { cover, to, from, message, createdBy } = data;

        if (isStringEmpty(cover) || isStringEmpty(to) || isStringEmpty(from) || isStringEmpty(message) || isStringEmpty(createdBy)) {
            throw new Meteor.Error('is-empty', 'Some fields are empty.');
        }

        const currentDate = new Date();

        data.createdAt = currentDate;
        data.updatedAt = currentDate;
        data.deleted = false;

        return Cards.insert(data);
    },
    getCardItem(cardId) {
        if (!Match.test(cardId, String)) {
            throw new Meteor.Error('not-valid', 'Data is not valid.');
        }

        if (isStringEmpty(cardId)) {
            throw new Meteor.Error('is-empty', 'Card ID is empty.');
        }

        const card = Cards.findOne(cardId, { fields: { createdBy: 0 } });

        if (!card) {
            throw new Meteor.Error('not-found', 'Card is not found.');
        }

        return card;
    },
});