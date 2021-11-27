import React from 'react';

const BookingCard = ({ booking }) => {
    const { vaccine, orderTime, status, paymentStatus } = booking;
    let statusBg = 'danger';
    let paymentStatusBg = 'warning';
    if (status === 'done') {
        statusBg = 'success'
    } else if (status === 'ongoing') {
        statusBg = 'warning'
    }
    if (paymentStatus === 'paid') {
        paymentStatusBg = 'success'
    } else if (paymentStatus === 'unpaid') {
        paymentStatusBg = 'danger'
    }

    return (
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">{vaccine?.name ? vaccine?.name : vaccine}</h5>
                    <p class="card-text">Order Time: {orderTime}</p>
                </div>
                <div class={`card-footer d-flex`}>
                    <span className="border rounded">Payment: <span class={`bg-${paymentStatusBg} px-1 border rounded`}>{paymentStatus || 'pending'}</span></span>
                    <span className="border rounded ms-auto">Order Status: <span class={`bg-${statusBg} px-1 border rounded`}>{status}</span></span>
                </div>

            </div>
        </div>
    );
};

export default BookingCard;