import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Dashboards from '../src/components/views/Dashboards/Dashboards';
import Kitchen from '../src/components/views/Kitchen/KitchenContainer';
import Login from '../src/components/views/Login/Login';
import Tables from '../src/components/views/Tables/Tables';
import Waiter from '../src/components/views/Waiter/WaiterContainer';
import Order from '../src/components/views/Order/OrderContainer';
import Booking from './components/views/Booking/Booking';
import Events from './components/views/Events/Events';
import {StylesProvider} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {  main: '#2B4C6F' },
    //secondary: { main: '#11cb5f' },
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={'/panel'}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Switch>
                <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
                <Route exact path={process.env.PUBLIC_URL + '/dashboards'} component={Dashboards} />
                <Route exact path={process.env.PUBLIC_URL + '/kitchen'} component={Kitchen} />
                <Route exact path={process.env.PUBLIC_URL + '/tables'} component={Tables} />
                <Route exact path={process.env.PUBLIC_URL + '/waiter'} component={Waiter} />
                <Route exact path={process.env.PUBLIC_URL + '/booking'} component={Booking} />
                <Route exact path={process.env.PUBLIC_URL + '/booking/id'} component={Booking} />
                <Route exact path={process.env.PUBLIC_URL + '/events'} component={Events} />
                <Route exact path={process.env.PUBLIC_URL + '/events/id'} component={Events} />
                <Route exact path={process.env.PUBLIC_URL + '/events/new'} component={Events} />
                <Route exact path={process.env.PUBLIC_URL + '/order'} component={Order} />
                <Route exact path={process.env.PUBLIC_URL + '/order/id'} component={Order} />
                <Route exact path={process.env.PUBLIC_URL + '/order/new'} component={Order} />
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
