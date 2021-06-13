import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../../App';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    })

    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    initializeLoginFramework()

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res)
        // console.log('res', res)
        setLoggedInUser(res)
        redirect && history.replace(from)
    }

    const handleError = (isFieldValid, errorMessage) => {
        const newUserInfo = { ...user }

        newUserInfo.error = isFieldValid ? '' : errorMessage;
        // console.log(isFieldValid, newUserInfo.error)
        setUser(newUserInfo)
    }

    const handleChange = (event) => {
        let isFieldValid = true
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
            handleError(isFieldValid, 'please enter valid email')
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
            handleError(isFieldValid, 'please enter valid password')
        }
        if (event.target.name === 'confirmPassword') {
            const isPasswordMatched = event.target.value === user.password
            isFieldValid = isPasswordMatched
            handleError(isFieldValid, 'password did not match')
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value
            newUserInfo.error = ''
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.displayName, user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // console.log(res)

                    handleResponse(res, res.error ? false : true)
                })
        }
        event.preventDefault()
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{newUser ? 'Create an account' : 'Login'}</h5>
                            <form onSubmit={handleSubmit} >
                                {newUser && <input type="text" className='form-control' name='displayName' onBlur={handleChange} placeholder="Your name" required />}
                                <br />
                                <input type="text" className='form-control' name="email" onChange={handleChange} placeholder='Your Email address' required />
                                <br />
                                <input type="password" className='form-control' name='password' onBlur={handleChange} placeholder="Your password" required />
                                <br />
                                {newUser && <input type="password" className='form-control' name='confirmPassword' onChange={handleChange} placeholder="Confirm Password" required />}
                                {<small className='text-danger'>{user.error}</small>}
                                <br />
                                <input type="submit" className='btn btn-primary' value={newUser ? 'Register' : 'Sign in'} />
                            </form>
                            <p>{newUser ? 'Already have an account?' : "Don't have an account?"} <button className='btn btn-secondary' onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Create an account'}</button></p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Or</h5>
                            <button className='btn border-primary' onClick={googleSignIn}> <FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
    );
};

export default Login;