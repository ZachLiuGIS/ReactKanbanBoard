import React, { Component, PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import { Link } from 'react-router';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

class KanbanBoard extends Component {

    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        return (
            <div className="app">
                <Link to="/new" className="float-button">+</Link>
                <List id="todo" title="To Do" cards={
                    this.state.cards.filter((card) => card.status === 'todo')
                } />

                <List id="in-progress" title="In Progress" cards={
                this.state.cards.filter((card) => card.status === 'in-progress')
                } />

                <List id="done" title="Done"  cards={
                this.state.cards.filter((card) => card.status === 'done')
                } />

                {this.props.children}
            </div>
        );

    }
}

KanbanBoard.getStores = () => ([CardStore]);
KanbanBoard.calculateState = (prevState) => ({
    cards: CardStore.getState()
});

KanbanBoard = Container.create(KanbanBoard);

export default DragDropContext(HTML5Backend)(KanbanBoard);