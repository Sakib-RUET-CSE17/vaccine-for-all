import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import PaymentTable from './PaymentTable';

const PaymentList = () => {
    const [payments, setPayments] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch(`https://young-citadel-36577.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                // sort to do
                setPayments(data)
            })
    }, [loggedInUser.email])
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">Payments</h5>
                <PaymentTable payments={payments} />
            </div>
        </div>
    );
};

export default PaymentList;