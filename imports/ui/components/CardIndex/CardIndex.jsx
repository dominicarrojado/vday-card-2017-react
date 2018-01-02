import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Clipboard from 'clipboard';

import parseMessage from '../../../utils/parse-message.js';
import getButtonColor from '../../../utils/get-button-color.js';

const Tooltip = {
    timeout: 0,

    show({ classList }) {
        const self = this;

        clearTimeout(self.timeout);

        classList.add('active');

        self.timeout = setTimeout(() => {
            classList.remove('active');
        }, 1000);
    }
};

class CardIndex extends Component {
    constructor() {
        super();

        const self = this;

        self.state = {
            isGettingCard: true,
            card: '',
            error: '',
        };
    }

    static shareToFacebook(cardId) {
        window.open(`https://www.facebook.com/sharer?u=${Meteor.absoluteUrl(cardId)}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
    }

    static shareToTwitter(cardId) {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('I have a message for you check it here: ')}&url=${Meteor.absoluteUrl(cardId)}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
    }

    componentDidMount() {
        const self = this;
        const { props } = self;

        Meteor.call('getCardItem', props.match.params.cardId, (error, result) => {
            if (error) {
                props.history.push('/');
            } else {
                self.setState({
                    isGettingCard: false,
                    card: result,
                });

                var btnCopyLink = document.getElementById('btnCopyLink');
                var clipboard = new Clipboard(btnCopyLink);

                clipboard.on('success', () => {
                    console.log('Success!');
                    Tooltip.show(btnCopyLink);
                });

                clipboard.on('error', () => {
                    self.setState({ error: 'There was an error on copying the link.' });
                });
            }
        });
    }

    render() {
        const self = this;
        const { isGettingCard, card, error } = self.state;
        const { isCardOpen, setCardOpen } = self.props;
        const { _id, cover, to, from, message, createdAt } = card;

        return !isGettingCard ? (
            <div className="container-main">
                <div className="right">
                    <div onClick={() => setCardOpen(false)} className={`${isCardOpen ? 'show' : ''} bg-${cover} btn-preview`}>
                        <img src={`/images/cover-${cover}.gif`} />
                    </div>
                    <div className="date">
                        {moment(createdAt).format('MMMM D, YYYY')}
                    </div>
                    <div className="input-group">
                        <label htmlFor="to">
                            To:
                        </label>
                        <div className="name form-control">
                            {to}
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="from">
                            From:
                        </label>
                        <div className="name form-control">
                            {from}
                        </div>
                    </div>
                    <div className="message spaced">
                        <div dangerouslySetInnerHTML={parseMessage(message)} className="form-control"></div>
                    </div>
                    <div className="text-center">
                        <Link to="/" className={`btn-${getButtonColor(cover)} btn`}>Create another one</Link>
                    </div>

                    {error ? <div className="error">{error}</div> : ''}

                    <div className="sharer">
                        <div className="content">
                            Share this card
                        </div>
                        <div className="buttons">
                            <button onClick={() => CardIndex.shareToFacebook(_id)} type="button">
                                <img src="/images/icons/icon-facebook.png" alt="Facebook" />
                            </button>
                            <button onClick={() => CardIndex.shareToTwitter(_id)} type="button">
                                <img src="/images/icons/icon-twitter.png" alt="Twitter" />
                            </button>
                            <button data-clipboard-text={Meteor.absoluteUrl(_id)} id="btnCopyLink" type="button">
                                <img src="/images/icons/icon-link.png" alt="Link" />
                            </button>
                        </div>
                        <div className="content">
                            or copy this link:
                        </div>
                        <div className="link">
                            {Meteor.absoluteUrl(_id)}
                        </div>
                    </div>
                </div>
                <div className="left">
                    <div className={`bg-${cover} ${isCardOpen ? 'show' : ''} cover-index`}>
                        <img src={`/images/cover-${cover}.gif`} />
                        <button onClick={() => setCardOpen(!isCardOpen)} className={`btn-${getButtonColor(cover)} btn`} type="button">
                            {isCardOpen ? 'Close' : 'Open'}
                        </button>
                    </div>
                </div>
            </div>
        ) : '';
    }
}

CardIndex.propTypes = {
    isCardOpen: PropTypes.bool.isRequired,
    setCardOpen: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default CardIndex;