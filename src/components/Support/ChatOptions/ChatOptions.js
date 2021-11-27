import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const ChatOptions = () => {
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5 row" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <Link to='/liveChat' className="btn btn-primary m-5 col-md-3">Live Chat</Link>
                <Link to='/sms' className="btn btn-primary m-5 col-md-3">Send SMS to +8801XXXXXXXXX</Link>

            </div>
        </div>
    );
};

export default ChatOptions;