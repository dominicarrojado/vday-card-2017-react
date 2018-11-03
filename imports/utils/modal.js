import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

const Modal = {
  show(component) {
    render(component, document.getElementById('modal'));
  },

  hide() {
    unmountComponentAtNode(document.getElementById('modal'));
  },
};

export default Modal;
