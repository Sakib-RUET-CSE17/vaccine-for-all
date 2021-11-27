import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import OrderTable from '../OrderTable/OrderTable';

const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch(`https://young-citadel-36577.herokuapp.com/paidOrders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5 row" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <Link to='/allOrder' className="btn btn-primary m-5 col-md-3">Show All Order</Link>
                <Link to='/orderByLocation' className="btn btn-primary m-5 col-md-3">Show By Location</Link>

            </div>
        </div>
    );
};

export default OrderList;