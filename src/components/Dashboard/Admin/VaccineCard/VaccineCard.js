import React, { useState } from 'react';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VaccineCard = ({ vaccine }) => {
    const { name, imageURL, price, ageDuration, _id } = vaccine
    const [edit, setEdit] = useState(false)
    const [editedPrice, setEditedPrice] = useState(price)

    const deleteVaccine = () => {
        // console.log(id)
        fetch(`https://young-citadel-36577.herokuapp.com/deleteVaccine/${_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                document.getElementById(_id).innerHTML = ''
            })
    }

    const editVaccine = () => {
        if (edit) {
            const vaccinData = { price: editedPrice }
            fetch(`https://young-citadel-36577.herokuapp.com/updateVaccine/${_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccinData)
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        setEdit(false)
                    }
                })
        }

        else { setEdit(true) }
    }
    return (
        <div id={_id} class="col">
            <div class="card h-100">
                <img src={imageURL} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{ageDuration}</p>
                    BDT {edit ? <input onChange={e => setEditedPrice(parseInt(e.target.value))} type="text" defaultValue={editedPrice} /> : editedPrice}
                </div>
                <button onClick={editVaccine} className="bg-warning rounded">{edit ? <>OK</> : <FontAwesomeIcon icon={faEdit} />}</button>
                <button onClick={deleteVaccine} className="bg-danger rounded"><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>
    );
};

export default VaccineCard;