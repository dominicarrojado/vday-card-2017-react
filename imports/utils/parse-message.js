import { _ } from 'meteor/underscore';

const parseMessage = message => {
  if (!message) return '';

  // escape HTML tags
  message = _.escape(message);

  // replace newline to br
  message = message.replace(/\n/gm, ' <br/> ');

  // replace double space with nbsp
  message = message.replace(/  /gm, ' &nbsp;');

  return { __html: message };
};

export default parseMessage;
