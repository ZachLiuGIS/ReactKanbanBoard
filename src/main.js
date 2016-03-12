import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoard from './components/KanbanBoard';

import { cardsList } from './data/card_list';
const root = document.getElementById('root');


ReactDOM.render(<KanbanBoard cards={cardsList} />, root);