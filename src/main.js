import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { browserHistory } from 'react-router'
import KanbanBoardContainer from './components/KanbanBoardContainer';
import KanbanBoard from './components/KanbanBoard';
import NewCard from './components/NewCard';
import EditCard from './components/EditCard';

const root = document.getElementById('root');

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route component={KanbanBoardContainer}>
                    <Route path="/" component={KanbanBoard}>
                        <Route path="new" component={NewCard}/>
                        <Route path="edit/:card_id" component={EditCard}/>
                    </Route>
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<Routes />, root);