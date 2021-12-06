import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';

const Certificate = ({ download, setDownload }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { id } = useParams();
    const [order, setOrder] = useState({});
    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/order/' + id)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [id])
    // console.log(order)
    const capitalize = (string) => string?.charAt(0)?.toUpperCase() + string?.slice(1);

    if (download) {
        handlePrint();
        setDownload(false);
    }
    return (
        <Container ref={componentRef} className="" fluid>
            <div className="border m-5">
                <div className="border-bottom py-3">
                    <h6 className="text-center">Vaccine Fol All</h6>
                    <h6 className="text-center">-Vaccination Management Project</h6>
                    <Row className="mt-4">
                        <Col xs={3} md={5} />
                        <Col xs={6} md={2}>
                            <Image className="text-center" src={order.clearancePhoto} fluid />
                        </Col>
                    </Row>
                </div>
                <header>
                    <h5 className="text-center pt-1">{order.vaccine?.name || order?.vaccine} Vaccination Certificate</h5>
                </header>
                <Table bordered hover>
                    <thead>
                        <tr className="bg-light">
                            <th colSpan="2">Beneficiary Details</th>
                            <th colSpan="2">Vaccination Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td>Certificate No:</td>
                            <td>BD{id.slice(0, 12).toUpperCase()}</td>
                            <td>Date of Vaccination:</td>
                            <td>{order?.orderTime?.slice(0, 10)}</td>
                        </tr>
                        <tr>
                            <td>Order No:</td>
                            <td>{order._id}</td>
                            <td>Name of Vaccine:</td>
                            <td>{order.vaccine?.name || order?.vaccine}</td>
                        </tr>
                        <tr>
                            <td>Passport No:</td>
                            <td>N/A</td>
                            <td>Total Doses:</td>
                            <td>{order.vaccine?.doses || '1'}</td>
                        </tr>
                        <tr>
                            <td>Nationality:</td>
                            <td>Bangladeshi</td>
                            <td>Status:</td>
                            <td>Done</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{order.bookingData?.name}</td>
                            <td rowSpan="2">Vaccination Center:</td>
                            <td rowSpan="2">{`${order.bookingData?.upazilla}, ${capitalize(order.bookingData?.district)},`}
                                <p>{capitalize(order.bookingData?.division)}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{order.email}</td>
                        </tr>
                        <tr>
                            <td>Payment Method:</td>
                            <td>{order.bookingData?.paymentMethod}</td>
                            <td>Vaccinated By:</td>
                            <td>Directorate General of
                                <p>Health Services (DGHS)</p></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Certificate;