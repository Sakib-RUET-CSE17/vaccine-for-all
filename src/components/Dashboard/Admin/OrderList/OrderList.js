import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import OrderTable from '../OrderTable/OrderTable';

const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch(`https://young-citadel-36577.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">All Orders</h5>
                <OrderTable orders={orders} />
            </div>
        </div>
    );
};

export default OrderList;