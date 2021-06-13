import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';

const AddReview = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        // console.log(loggedInUser)
        const reviewData = {
            name: data.name,
            email: data.email,
            description: data.description,
            imageURL: loggedInUser.photoURL
        }
        fetch('https://young-citadel-36577.herokuapp.com/addReview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Thanks for your feedback');
                    e.target.reset()
                } else {
                    alert('Something Wrong!');
                }
            })
    }

    return (
        <div className="row">
            <div className="col-md-2 border border-primary">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10 text-center border border-primary">
                <h1>Add Review</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input className="form-control" defaultValue={loggedInUser.name || loggedInUser.displayName} placeholder='Name' {...register("name")} />
                    <br />
                    <input className="form-control" defaultValue={loggedInUser.email} placeholder='email' {...register("email")} />
                    <br />
                    <input className="form-control" placeholder='Description' {...register("description")} />
                    <br />
                    <input className="btn btn-dark" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddReview;