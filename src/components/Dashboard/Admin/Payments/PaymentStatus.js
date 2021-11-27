import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const PaymentStatus = ({ order }) => {
    // console.log(order)
    const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
    const [btnVariant, setBtnVariant] = useState('warning')

    useEffect(() => {
        // console.log(orderStatus)
        let variant = 'warning'
        if (paymentStatus === 'paid') {
            variant = 'success'
        } else if (paymentStatus === 'unpaid') {
            variant = 'danger'
        }
        setBtnVariant(variant)
    }, [paymentStatus])

    const handleChangeStatus = (status) => {
        fetch('https://young-citadel-36577.herokuapp.com/updatePaymentStatus/' + order._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentStatus: status })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result) {
                    if (status === 'paid') {
                        fetch('https://young-citadel-36577.herokuapp.com/updateStock/' + order.vaccineUpazillaRelationId, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(res => res.json())
                            .then(data => {
                                alert('Paid Successfully')
                            })
                    }
                    setPaymentStatus(status);
                }
            })

    }

    return (
        <DropdownButton variant={btnVariant} id="dropdown-basic-button" title={paymentStatus}>
            <Dropdown.Item className="rounded bg-warning" onClick={() => handleChangeStatus('pending')}>pending</Dropdown.Item>
            <Dropdown.Item className="rounded bg-danger" onClick={() => handleChangeStatus('unpaid')}>unpaid</Dropdown.Item>
            <Dropdown.Item className="rounded bg-success" onClick={() => handleChangeStatus('paid')}>paid</Dropdown.Item>
        </DropdownButton>
    );
};

export default PaymentStatus;