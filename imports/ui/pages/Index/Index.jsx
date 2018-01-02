import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CardCreate from '../../components/CardCreate/CardCreate';
import CardIndex from '../../components/CardIndex/CardIndex';
import NotFound from '../NotFound/NotFound';

class Index extends Component {
    constructor() {
        super();

        const self = this;

        self.state = {
            isCardOpen: false,
        };
        self.setCardOpen = self.setCardOpen.bind(self);
    }

    setCardOpen(boolean) {
        this.setState({ isCardOpen: boolean });
    }

    render() {
        const self = this;
        const { setCardOpen } = self;
        const { isCardOpen } = self.state;

        return (
            <div>
                <Switch>
                    <Route path="/:cardId" exact render={props => <CardIndex isCardOpen={isCardOpen} setCardOpen={setCardOpen} {...props} />} />
                    <Route path="/" exact render={props => <CardCreate setCardOpen={setCardOpen} {...props} />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default Index;