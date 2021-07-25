import React, { useEffect, useState } from 'react';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VaccineCard = ({ vaccineByUpazilla }) => {
    const [vaccine, setVaccine] = useState({})
    const [edit, setEdit] = useState(false)
    const [editedStock, setEditedStock] = useState(vaccineByUpazilla.available)
    const [editedPrice,setEditedPrice] = useState(0)

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/vaccine/' + vaccineByUpazilla.vaccine_id)
            .then(res => res.json())
            .then(data => {
                const newVaccine = { ...vaccineByUpazilla, vaccine: data }
                setVaccine(newVaccine)
                setEditedPrice(data.price)
            })
        // console.log(vaccineByUpazilla)
    }, [vaccineByUpazilla])

    const deleteVaccine = () => {
        console.log(vaccine._id)
        fetch(`https://young-citadel-36577.herokuapp.com/deleteVaccine/${vaccine._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                document.getElementById(vaccine._id).innerHTML = ''
            })
    }

    const editVaccine = () => {
        if (edit) {
            const vaccineData = {available:editedStock }
            fetch(`https://young-citadel-36577.herokuapp.com/addStock/${vaccine._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccineData)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result) {
                        setEdit(false)
                    }
                })
        }

        else { setEdit(true) }
    }
    return (
        <div id={vaccine._id} class="col">
            <div class="card h-100">
                <img src={vaccine.vaccine?.imageURL} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{vaccine.vaccine?.name}</h5>
                    <p class="card-text">{vaccine.vaccine?.ageDuration}</p>
                    <p>BDT {edit ? <input onChange={e => setEditedPrice(parseInt(e.target.value))} type="text" defaultValue={editedPrice} /> : editedPrice}</p>
                    Stock: {edit ? <input onChange={e => setEditedStock(parseInt(e.target.value))} type="text" defaultValue={editedStock} /> : editedStock}
                </div>
                <button onClick={editVaccine} className="bg-warning rounded">{edit ? <>OK</> : <FontAwesomeIcon icon={faEdit} />}</button>
                <button onClick={deleteVaccine} className="bg-danger rounded"><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>
    );
};

export default VaccineCard;