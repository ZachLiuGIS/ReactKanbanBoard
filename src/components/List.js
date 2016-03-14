import React, { Component, PropTypes} from 'react';
import Card from './Card';

class List extends Component {
    render() {
        var cards = this.props.cards.map((card) => {
            return <Card taskCallbacks={this.props.taskCallbacks}
                         key={card.id}
                         {...card} />
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
};

export default List;