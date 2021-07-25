import React, { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import LiveSupportTable from './LiveSupportTable/LiveSupportTable';

const LiveSupport = () => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/supportQueue')
            .then(res => res.json())
            .then(data => setClients(data))
    }, [])
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">Support Live Queue</h5>
                <LiveSupportTable clients={clients}></LiveSupportTable>
            </div>
        </div>
    );
};

export default LiveSupport;