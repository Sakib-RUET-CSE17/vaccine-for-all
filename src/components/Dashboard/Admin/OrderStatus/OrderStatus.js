import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown, Modal, Button, ProgressBar } from 'react-bootstrap';
import EditableAvatar from './EditableAvatar';

const OrderStatus = ({ order }) => {
    // console.log(order)
    const [orderStatus, setOrderStatus] = useState(order.status);
    const [btnVariant, setBtnVariant] = useState('danger');
    const [show, setShow] = useState(false);
    const [imageURL, setImageURL] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        fetch('https://young-citadel-36577.herokuapp.com/updateOrderStatus/' + order._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'done', clearancePhoto: imageURL })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    fetch('https://young-citadel-36577.herokuapp.com/updateServed/' + order.vaccineUpazillaRelationId, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then(res => res.json())
                        .then(data => {
                            setShow(false);
                            setOrderStatus('done');
                            setUploadProgress(0);
                        })
                }
            })
    }

    const handleImageUpload = event => {
        setUploadProgress(50)
        const imageData = new FormData()
        imageData.set('key', '65a2dd24ccada45d6cf50c5d7162b3a5')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
                setUploadProgress(100)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        // console.log(orderStatus)
        let variant = 'danger'
        if (orderStatus === 'done') {
            variant = 'success'
        } else if (orderStatus === 'ongoing') {
            variant = 'warning'
        }
        setBtnVariant(variant)
    }, [orderStatus])

    const handleChangeStatus = (status) => {
        if (status === 'done') {
            handleShow();
        } else {
            fetch('https://young-citadel-36577.herokuapp.com/updateOrderStatus/' + order._id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        setOrderStatus(status)
                    }
                })
        }

    }

    return (
        <DropdownButton variant={btnVariant} id="dropdown-basic-button" title={orderStatus}>
            <Dropdown.Item className="rounded bg-danger" onClick={() => handleChangeStatus('pending')}>pending</Dropdown.Item>
            <Dropdown.Item className="rounded bg-warning" onClick={() => handleChangeStatus('ongoing')}>ongoing</Dropdown.Item>
            <Dropdown.Item className="rounded bg-success" onClick={() => handleChangeStatus('done')}>done</Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Image Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex bg-white border border-gray-400 relative text-center m-auto" style={{
                        width: "16rem",
                        height: "18rem"
                    }}>
                        <EditableAvatar imageURL={imageURL} handleImageUpload={handleImageUpload} />
                        <ProgressBar animated now={uploadProgress} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </DropdownButton>
    );
};

export default OrderStatus;