import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Default from '../../ui/layouts/Default/Default';
import '../../ui/stylesheets/main.less';

Meteor.startup(() => render(<Default />, document.getElementById('react-root')));