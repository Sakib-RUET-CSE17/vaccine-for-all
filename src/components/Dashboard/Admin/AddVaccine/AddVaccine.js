import axios from 'axios';
import React, { useState } from 'react';
import { set, useForm } from "react-hook-form";
import Sidebar from '../../Sidebar/Sidebar';

const AddVaccine = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null)
    const [uploadProgress, setUploadProgress] = useState({ progress: 100, bg: 'light' })

    const handleProgress = (progress, bg) => {
        const newProgress = { ...uploadProgress }
        newProgress.progress = progress
        newProgress.bg = bg
        setUploadProgress(newProgress)
    }

    const onSubmit = (data, e) => {
        const vaccinData = {
            name: data.name,
            ageDuration: data.ageDuration,
            price: data.price,
            imageURL: imageURL
        }
        if (imageURL !== null) {
            fetch('https://young-citadel-36577.herokuapp.com/addVaccine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccinData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        alert('Added Successfully');
                        e.target.reset()
                    } else {
                        alert('Something Wrong!');
                    }
                })
        }
        else {
            alert('Image Upload Failed!');
        }
        handleProgress(100, 'light')
    }
    const handleImageUpload = event => {
        handleProgress(50, 'light')
        const imageData = new FormData()
        imageData.set('key', '65a2dd24ccada45d6cf50c5d7162b3a5')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
                handleProgress(100, 'info')
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="row">
            <div className="col-md-2 border border-primary">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10 text-center border border-primary">
                <h1>Add Vaccine</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input className="form-control" placeholder='Vaccine Name(Ex: Hepatitis B)' {...register("name")} />
                    <br />
                    <input className="form-control" placeholder='Age Duration(Ex: 6-18 months)' {...register("ageDuration")} />
                    <br />
                    <input className="form-control" placeholder='Price in BDT(Ex: 800)' {...register("price")} />
                    <br />

                    <div className="progress h-100">

                        {/* <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{ width: `${uploadProgress}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"> */}
                        <input className={`form-control progress-bar progress-bar-striped progress-bar-animated bg-${uploadProgress.bg}`} style={{ width: `${uploadProgress.progress}%` }} role="progressbar" type='file' onChange={handleImageUpload} />

                    </div>
                    <br />
                    <input className="btn btn-dark" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddVaccine;