import React from 'react';

const BookingCard = ({ booking }) => {
    const { vaccine, orderTime, status } = booking;
    let bg = 'danger'
    if (status === 'done') {
        bg = 'success'
    } else if (status === 'ongoing') {
        bg = 'warning'
    }

    return (
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">{vaccine}</h5>
                    <p class="card-text">Order Time: {orderTime}</p>
                </div>
                <div class={`card-footer bg-${bg}`}>{status}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;