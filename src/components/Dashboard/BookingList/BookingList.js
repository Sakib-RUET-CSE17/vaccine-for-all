import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../../App';
import BookingCard from '../BookingCard/BookingCard';
import Sidebar from '../Sidebar/Sidebar';

const BookingList = () => {
    const [bookings, setBookings] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch(`https://young-citadel-36577.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [loggedInUser.email])
    return (
        <div className="row">
            <div className="col-md-2 border border-primary">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10 border border-primary">
                <h1>Booking List</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {bookings.map(booking => <BookingCard booking={booking}></BookingCard>)}
                </div>
            </div>
        </div>
    );
};

export default BookingList;