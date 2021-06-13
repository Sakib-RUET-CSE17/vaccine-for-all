import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import Book from './components/Dashboard/Book/Book';
import BookingList from './components/Dashboard/BookingList/BookingList';
import MakeAdmin from './components/Dashboard/Admin/MakeAdmin/MakeAdmin';
import AddVaccine from './components/Dashboard/Admin/AddVaccine/AddVaccine';
import AddReview from './components/Dashboard/AddReview/AddReview';
import OrderList from './components/Dashboard/Admin/OrderList/OrderList';
import Admin from './components/Dashboard/Admin/Admin/Admin';
import ManageVaccines from './components/Dashboard/Admin/ManageVaccines/ManageVaccines';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute path="/book/:vaccineId">
            <Book></Book>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <BookingList></BookingList>
          </PrivateRoute>
          <PrivateRoute path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>
          <PrivateRoute path="/addVaccine">
            <AddVaccine></AddVaccine>
          </PrivateRoute>
          <PrivateRoute path="/addReview">
            <AddReview></AddReview>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/orderList">
            <OrderList></OrderList>
          </PrivateRoute>
          <PrivateRoute path="/manageVaccines">
            <ManageVaccines></ManageVaccines>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
