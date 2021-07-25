import React, { useState } from 'react';
import { useEffect } from 'react';

const LoadVaccine = () => {
    const [vaccines, setVaccines] = useState([])
    let vaccineUpazillaRelation = []

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/vaccines')
            .then(res => res.json())
            .then(data => setVaccines(data))
    }, [])

    const handleClick = () => {
        fetch('https://bdapis.herokuapp.com/api/v1.1/divisions')
            .then(res => res.json())
            .then(data => {
                data.data.map(division => {
                    // console.log(division._id)
                    fetch('https://bdapis.herokuapp.com/api/v1.1/division/' + division._id)
                        .then(res => res.json())
                        .then(data => {
                            // console.log(division._id, data.data)
                            data.data.map(district => {
                                // console.log(division._id, district._id,district.upazilla)
                                district.upazilla.map(upazilla => {
                                    console.log(division._id, district._id, upazilla)
                                    vaccines.map(vaccine => {
                                        vaccineUpazillaRelation.push({
                                            vaccine_id: vaccine._id,
                                            division: division._id,
                                            district: district._id,
                                            upazilla,
                                            available: 100,
                                            served: 0,
                                        })
                                    })
                                })
                            })
                        })
                })
            })
    }

    const handleUpload = () => {
        console.log(vaccineUpazillaRelation.slice(0, 1000))
        console.log(vaccineUpazillaRelation.slice(1000, 2000))
        console.log(vaccineUpazillaRelation.slice(2000, 3000))
        console.log(vaccineUpazillaRelation.slice(3000, 4000))
        console.log(vaccineUpazillaRelation.slice(4000, 5000))
        console.log(vaccineUpazillaRelation.slice(5000, 6000))
        // vaccineUpazillaRelation.map(v => {
        //     fetch('https://young-citadel-36577.herokuapp.com/loadVaccine', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(v)
        //     })
        //         .then(res => res.json())
        //         .then(data => console.log(data))
        // })
    }

    const handleLoad = (n) => {
        vaccineUpazillaRelation.slice((n - 1) * 1000, n * 1000).map(v => {
            fetch('https://young-citadel-36577.herokuapp.com/loadVaccine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(v)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        })
    }
    return (
        <div>
            <button onClick={handleClick}>Load</button>
            <button onClick={handleUpload}>Upload</button>
            <button onClick={() => handleLoad(1)}>Upload 1</button>
            <button onClick={() => handleLoad(2)}>Upload 2</button>
            <button onClick={() => handleLoad(3)}>Upload 3</button>
            <button onClick={() => handleLoad(4)}>Upload 4</button>
            <button onClick={() => handleLoad(5)}>Upload 5</button>
            <button onClick={() => handleLoad(6)}>Upload 6</button>
        </div>
    );
};

export default LoadVaccine;