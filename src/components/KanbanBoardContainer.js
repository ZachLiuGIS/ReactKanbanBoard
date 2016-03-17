import React, { Component } from 'react';
import 'whatwg-fetch';
import 'babel-polyfill';
import update from 'react-addons-update';
import { throttle } from '../utils/Utils';
import KanbanBoard from './KanbanBoard';

import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

class KanbanBoardContainer extends Component {

    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        let KanbanBoard = this.props.children && React.cloneElement(this.props.children, {
                cards: this.state.cards
            });

        return KanbanBoard;
    }
}

KanbanBoardContainer.getStores = () => ([CardStore]);
KanbanBoardContainer.calculateState = (prevState) => ({
    cards: CardStore.getState()
});

export default Container.create(KanbanBoardContainer);