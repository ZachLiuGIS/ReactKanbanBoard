import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import KanbanBoard from './components/KanbanBoard';
import NewCard from './components/NewCard';
import EditCard from './components/EditCard';

const root = document.getElementById('root');

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={KanbanBoard}>
                    <Route path="new" component={NewCard}/>
                    <Route path="edit/:card_id" component={EditCard}/>
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<Routes />, root);