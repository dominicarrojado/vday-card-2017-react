import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import PropTypes from 'prop-types';
import moment from 'moment';

import Modal from '../../../utils/modal.js';
import getCovers from '../../../utils/get-covers.js';
import getButtonColor from '../../../utils/get-button-color.js';
import isStringEmpty from '../../../utils/is-string-empty.js';

import ModalSuggestion from '../ModalSuggestion/ModalSuggestion';

class CardCreate extends Component {
    constructor() {
        super();

        const self = this;

        let userId = window.localStorage.getItem('userId');

        if (!userId) {
            userId = Random.id();
            window.localStorage.setItem('userId', userId);
        }

        self.state = {
            userId,
            coverActive: 'teal',
            isCreatingCard: false,
            error: '',
        };
        self.setCover = self.setCover.bind(self);
        self.handleSubmit = self.handleSubmit.bind(self);
    }

    static currentDate = moment().format('MMMM D, YYYY');

    static maximizeCover = (event) => {
        const { currentTarget } = event;

        currentTarget.classList.add('show');
        document.getElementById('btnClose').classList.add('show');

        const containerMain = document.getElementById('containerMain');

        containerMain.scrollTop = 0;
        containerMain.classList.add('cover-open');
    };

    static minimizeCover = () => {
        document.getElementById('cover').classList.remove('show');
        document.getElementById('btnClose').classList.remove('show');
        document.getElementById('containerMain').classList.remove('cover-open');
    };

    setCover(cover) {
        this.setState({ coverActive: cover });
    }

    handleSubmit(event) {
        event.preventDefault();

        const self = this;
        const { isCreatingCard, coverActive, userId } = self.state;

        if (isCreatingCard) return;

        const { target } = event;
        const to = target.inputTo.value;
        const from = target.inputFrom.value;
        const message = target.inputMessage.value;

        if (isStringEmpty(to) || isStringEmpty(from) || isStringEmpty(message)) {
            return self.setState({ error: 'Do not rush love! Please fill out everything before publishing.' });
        }

        self.setState({
            isCreatingCard: true,
            error: '',
        });

        Meteor.call('createCardItem', {
            to,
            from,
            message,
            cover: coverActive,
            createdBy: userId,
        }, (error, result) => {
            if (error) {
                self.setState({
                    isCreatingCard: false,
                    error: error.reason,
                })
            } else {
                const { props } = self;

                props.history.push(`/${result}`);
                props.setCardOpen(true);
            }
        });
    }

    render() {
        const self = this;
        const { state, setCover, handleSubmit } = self;
        const { coverActive, error } = state;

        return (
            <div id="containerMain" className="container-main overflow">
                <div id="right" className="right">
                    <div className="cover-selector">
                        <label>
                            Select a cover
                        </label>
                        <ul className="list clearfix">
                            {
                                getCovers().map((cover, index) => {
                                    return (
                                        <li key={index} onClick={() => setCover(cover)} className={coverActive === cover ? 'active' : ''}>
                                            <div style={{ backgroundImage: `url('/images/icons/icon-cover-${cover}.png')` }}></div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="date">
                        {CardCreate.currentDate}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="inputTo">
                                To:
                            </label>
                            <input id="inputTo" type="text" className="form-control" spellCheck="false" autoComplete="off" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="inputFrom">
                                From:
                            </label>
                            <input id="inputFrom" type="text" className="form-control" spellCheck="false" autoComplete="off" />
                        </div>
                        <div className="message">
                            <textarea id="inputMessage" placeholder="Type your message here..." className="form-control"></textarea>
                            <button onClick={() => Modal.show(<ModalSuggestion />)} type="button">
                                <img src="/images/icons/icon-question-mark.png" alt="?" />
                            </button>
                        </div>

                        {error ? <div className="error">{error}</div> : ''}

                        <div className="text-center">
                            <button type="submit" className={`btn-${getButtonColor(coverActive)} btn`}>Publish</button>
                        </div>
                    </form>
                </div>
                <div className="left">
                    <div onClick={CardCreate.maximizeCover} id="cover" className={`bg-${coverActive} cover`}>
                        {
                            getCovers().map((cover, index) => {
                                return <img key={index} src={`/images/cover-${cover}.gif`} className={coverActive === cover ? 'show' : ''} />;
                            })
                        }
                    </div>
                    <button onClick={CardCreate.minimizeCover} id="btnClose" className="btn-close">&times;</button>
                </div>
            </div>
        );
    }
}

CardCreate.propTypes = {
    setCardOpen: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default CardCreate;