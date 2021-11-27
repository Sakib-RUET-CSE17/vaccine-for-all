
import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import OrderStatus from '../OrderStatus/OrderStatus';

const OrderTable = ({ orders }) => {

    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-secondary text-left" scope="col">Sl No</th>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Email</th>
                    <th className="text-secondary" scope="col">Vaccine</th>
                    <th className="text-secondary" scope="col">Pay With</th>
                    <th className="text-secondary" scope="col">Dose</th>
                    <th className="text-secondary" scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order, index) => {
                        let doses = order.vaccine?.doses ? order.vaccine?.doses : 1;
                        let dosesArray = [];
                        for (let i = 0; i < doses; i++)
                            dosesArray.push(i + 1);
                        return dosesArray.map(dose => <tr>
                            <td>{dose === 1 && (index + 1)}</td>
                            <td>{dose === 1 && order.name}</td>
                            <td>{dose === 1 && order.email}</td>
                            <td>{ (order.vaccine?.name || order.vaccine)}</td>
                            <td>{dose === 1 && (order.bookingData?.paymentMethod || 'Credit Card')}</td>
                            <td>{dose}</td>

                            <td>
                                <OrderStatus order={order}></OrderStatus>
                            </td>
                        </tr>)
                    }
                    )
                }
            </tbody>
        </table>
    );
};

export default OrderTable;