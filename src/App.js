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
import Join from './components/Support/Join/Join';
import Chat from './components/Support/Chat/Chat';
import LiveSupport from './components/Dashboard/Admin/LiveSupport/LiveSupport';
import LoadVaccine from './components/LoadVaccine/LoadVaccine';
import Services from './components/Home/Services/Services';
import AllOrder from './components/Dashboard/Admin/OrderList/AllOrder/AllOrder';
import OrderByLocation from './components/Dashboard/Admin/OrderList/OrderByLocation/OrderByLocation';
import PaymentList from './components/Dashboard/Admin/Payments/PaymentList';
import ChatOptions from './components/Support/ChatOptions/ChatOptions';

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
          <PrivateRoute path="/getVaccine">
            <Services></Services>
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
          <PrivateRoute path="/payments">
            <PaymentList />
          </PrivateRoute>
          <PrivateRoute path="/allOrder">
            <AllOrder></AllOrder>
          </PrivateRoute>
          <PrivateRoute path="/orderByLocation">
            <OrderByLocation></OrderByLocation>
          </PrivateRoute>
          <PrivateRoute path="/manageVaccines">
            <ManageVaccines></ManageVaccines>
          </PrivateRoute>
          <PrivateRoute path="/liveSupport">
            <LiveSupport></LiveSupport>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/liveChat">
            <Join></Join>
          </PrivateRoute>
          <PrivateRoute path="/liveChatOptions">
            <ChatOptions />
          </PrivateRoute>
          <Route path="/startChat" component={Chat} />
          <Route path="/loadVaccine" component={LoadVaccine} />
        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
