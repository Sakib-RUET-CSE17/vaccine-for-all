
import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import OrderStatus from '../OrderStatus/OrderStatus';
import PaymentStatus from './PaymentStatus';

const OrderTable = ({ payments }) => {

    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-secondary text-left" scope="col">Sl No</th>
                    <th className="text-secondary" scope="col">Payment Method</th>
                    <th className="text-secondary" scope="col">Amount</th>
                    <th className="text-secondary" scope="col">Trxn Id</th>
                    <th className="text-secondary" scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    payments.map((payment, index) =>

                        <tr>
                            <td>{index + 1}</td>
                            <td>{payment.bookingData.paymentMethod}</td>
                            <td>{payment?.vaccine?.price}</td>
                            <td>{payment.paymentId}</td>

                            <td>
                                <PaymentStatus order={payment} />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default OrderTable;