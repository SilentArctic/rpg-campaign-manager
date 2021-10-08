import { Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import Campaign from './views/Campaign';

export default (
   <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/campaign/:id" component={Campaign} />
   </Switch>
);
