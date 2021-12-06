import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';
import healthCallCenterImg from '../../../images/healthCallCenter.jpg'
import emergencyNumbersImg from '../../../images/emergencyNumbers.jpg'

const ChatOptions = () => {
    const [showNumbers, setShowNumbers] = useState(false);
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5 row" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <Link to='/liveChat' className="btn btn-primary m-5 col-md-3">Live Chat</Link>
                <button onClick={() => setShowNumbers(true)} className="btn btn-primary m-5 col-md-3">Helpline Numbers</button>
                {
                    showNumbers &&
                    <Row>
                        <Col md={6}>
                            <Image src={healthCallCenterImg} fluid />
                        </Col>
                        <Col md={6}>
                            <Image style={{ height: '500px' }} src={emergencyNumbersImg} fluid />
                        </Col>
                    </Row>
                }

            </div>
        </div>
    );
};

export default ChatOptions;