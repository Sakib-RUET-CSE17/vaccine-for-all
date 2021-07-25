import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../App';
import LocationForm from '../../../../Shared/LocationForm/LocationForm';
import Sidebar from '../../../Sidebar/Sidebar';
import OrderTable from '../../OrderTable/OrderTable';

const OrderByLocation = () => {
    const [orders, setOrders] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [searchInfo, setSearchInfo] = useState({})

    const handleSubmit = (e) => {
        console.log('submitted', searchInfo)

        fetch(`https://young-citadel-36577.herokuapp.com/orderByLocation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)
            })

        e.preventDefault()
    }

    // useEffect(() => {
    //     fetch(`https://young-citadel-36577.herokuapp.com/orders?email=${loggedInUser.email}`)
    //         .then(res => res.json())
    //         .then(data => setOrders(data))
    // }, [loggedInUser.email])
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <LocationForm handleSubmit={handleSubmit} searchInfo={searchInfo} setSearchInfo={setSearchInfo}></LocationForm>

                <OrderTable orders={orders} />
            </div>
        </div>
    );
};

export default OrderByLocation;