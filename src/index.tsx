import React from 'react';
import ReactDOM from 'react-dom';
import ServiceWorkerService from './services/ServiceWorkerService';
import App from './components/App/App';

ReactDOM.render(<App />, document.getElementById('root'));

ServiceWorkerService.registerWorker();
