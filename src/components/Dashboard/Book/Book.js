import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../BookingForm/BookingForm';
import Sidebar from '../Sidebar/Sidebar';

const containerStyle = {
    backgroundColor: '#f4fdfb',
    height: '100%',
};

const Book = () => {
    const { vaccineId } = useParams()
    const [vaccine, setVaccine] = useState({})

    useEffect(() => {
        fetch(`https://young-citadel-36577.herokuapp.com/vaccine/${vaccineId}`)
            .then(res => res.json())
            .then(data => setVaccine(data))
    }, [vaccineId])
    return (
        <div style={containerStyle} className="container-fluid row">
            <div className="col">
                <Sidebar></Sidebar>
            </div>
            <div className="col">
                <BookingForm vaccine={vaccine}></BookingForm>
            </div>
        </div>
    );
};

export default Book;