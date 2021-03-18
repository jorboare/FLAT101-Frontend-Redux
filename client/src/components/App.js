import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './layout/Navigation'
import NewHouseForm from './pages/newHouseForm/NewHouseForm'
import EditHouseForm from './pages/editHouseForm/EditHouseForm'
import HousesList from './pages/housesList/HousesList'
import HouseDetails from './pages/houseDetails/HouseDetails'

import { Provider } from 'react-redux'
import store from './../store'

function App() {
  return (
    <Router>
      <Provider store={store}>

        <Navbar />
        <Switch>
          <Route path="/newHouse" exact render={props => <NewHouseForm />} />
          <Route path="/" exact render={() => <HousesList />} />
          <Route path="/detail/:id" exact render={() => <HouseDetails />} />
          <Route path="/edit/:id" exact render={() => <EditHouseForm />} />

        </Switch>

      </Provider>
    </Router>
  );
}

export default App;
