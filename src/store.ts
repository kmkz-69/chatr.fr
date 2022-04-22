import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers as app } from './components/App/App.state';
import { reducers as alert } from './components/Alert/Alert.state';
import { reducers as install } from './pages/Install/Install.state';
import { reducers as adminSignIn } from './pages/AdminSignIn/AdminSignIn.state';
import { reducers as join } from './pages/Join/Join.state';
import { reducers as start } from './pages/Start/Start.state';
import { reducers as meeting } from './pages/Meeting/Meeting.state';
import { reducers as hostCreate } from './components/HostCreate/HostCreate.state';
import { reducers as hosts } from './pages/Hosts/Hosts.state';
import { reducers as privacy } from './pages/Privacy/Privacy.state';
import { reducers as privacyEdit } from './pages/PrivacyEdit/PrivacyEdit.state';
import { reducers as whiteboard } from './components/Whiteboard/Whiteboard.state';

const reducers = combineReducers({
  app,
  alert,
  install,
  adminSignIn,
  join,
  start,
  meeting,
  hostCreate,
  hosts,
  privacy,
  privacyEdit,
  whiteboard,
});

export default createStore(reducers, composeWithDevTools(applyMiddleware()));
