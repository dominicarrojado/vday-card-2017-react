import React, { Component } from 'react';

import getMessages from '../../../utils/get-messages.js';
import parseMessage from '../../../utils/parse-message.js';

import Modal from '../../../utils/modal.js';

class SuggestionModal extends Component {
    static hide() {
        document.getElementById('modalSuggestion').classList.remove('show');
        document.getElementById('modalBackdrop').classList.remove('show');

        setTimeout(() => Modal.hide(), 400);
    }

    static messageOnClick(message) {
        document.getElementById('inputMessage').value = message;
        SuggestionModal.hide();
    }

    componentDidMount() {
        document.body.classList.add('modal-open');

        setTimeout(() => {
            document.getElementById('modalSuggestion').classList.add('show');
            document.getElementById('modalBackdrop').classList.add('show');
        }, 100);
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-open');
    }

    render() {
        return (
            <div>
                <div id="modalSuggestion" className="modal">
                    <div className="dialog">
                        <div className="wrapper">
                            <button onClick={SuggestionModal.hide} className="btn-close">&times;</button>
                            <div className="header">
                                Can't think of a message?<br />
                                Pick one from here!
                            </div>
                            <ul className="suggestions">
                                {
                                    getMessages().map((message, index) => {
                                        return <li key={index} onClick={() => SuggestionModal.messageOnClick(message)} dangerouslySetInnerHTML={parseMessage(message)}></li>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div onClick={SuggestionModal.hide} className="backdrop"></div>
                </div>
                <div id="modalBackdrop" className="modal-backdrop"></div>
            </div>
        );
    }
}

export default SuggestionModal;