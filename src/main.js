import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

class App extends React.Component {
    render() {
        var name = 'Zach';
        return (
            <div>Hello {name}.</div>
        )
    }
}

ReactDOM.render(<App/>, root);