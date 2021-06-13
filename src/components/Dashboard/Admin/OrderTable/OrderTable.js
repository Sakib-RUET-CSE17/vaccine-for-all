
import React from 'react';
import { DropdownButton,Dropdown } from 'react-bootstrap';
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
                    <th className="text-secondary" scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order, index) =>

                        <tr>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.vaccine}</td>
                            <td>Credit Card</td>

                            <td>
                                <OrderStatus order={order}></OrderStatus>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default OrderTable;