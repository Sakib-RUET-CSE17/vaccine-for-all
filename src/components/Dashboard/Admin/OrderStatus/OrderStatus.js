import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const OrderStatus = ({ order }) => {
    // console.log(order)
    const [orderStatus, setOrderStatus] = useState(order.status);
    const [btnVariant, setBtnVariant] = useState('danger')

    useEffect(() => {
        // console.log(orderStatus)
        let variant = 'danger'
        if (orderStatus === 'done') {
            variant = 'success'
        } else if (orderStatus === 'ongoing') {
            variant = 'warning'
        }
        setBtnVariant(variant)
    }, [orderStatus])

    const handleChangeStatus = (status) => {
        fetch('https://young-citadel-36577.herokuapp.com/updateOrderStatus/' + order._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setOrderStatus(status)
                }
            })

    }

    return (
        <DropdownButton variant={btnVariant} id="dropdown-basic-button" title={orderStatus}>
            <Dropdown.Item className="rounded bg-danger" onClick={() => handleChangeStatus('pending')}>pending</Dropdown.Item>
            <Dropdown.Item className="rounded bg-warning" onClick={() => handleChangeStatus('ongoing')}>ongoing</Dropdown.Item>
            <Dropdown.Item className="rounded bg-success" onClick={() => handleChangeStatus('done')}>done</Dropdown.Item>
        </DropdownButton>
    );
};

export default OrderStatus;