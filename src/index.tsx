import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './style/index.scss';

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));
