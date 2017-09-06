import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import VenueLanding from './venues/VenueLanding';
import VenueNew from './venues/VenueNew.js'
import ShowLanding from './shows/ShowLanding';
import ShowNew from './shows/ShowNew';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/venues" component={VenueLanding} />
          <Route exact path="/venues/new" component={VenueNew} />
          <Route exact path="/shows" component={ShowLanding} />
          <Route exact path="/shows/new" component={ShowNew} />
        </div>
      </BrowserRouter>  
    );
  }
};

export default connect(null, actions)(App);
