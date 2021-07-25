import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Join.css'

const Join = () => {
    const history = useHistory()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setName(loggedInUser.name || loggedInUser.displayName)
        setEmail(loggedInUser.email)
    }, [loggedInUser])

    const handleClick = () => {
        fetch('https://young-citadel-36577.herokuapp.com/addLiveChatQueue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push(`/startChat?name=${name}&email=${email}`)
                }
            })
    }

    return (
        <div className='joinOuterContainer'>
            <div className="joinInnerContainer">
                <h1 className='heading'>Join</h1>
                <div><input value={name} placeholder='Name' className='joinInput' type='text' onChange={(event) => setName(event.target.value)} /></div>
                <div><input value={email} placeholder='Email' className='joinInput mt-20' type='text' onChange={(event) => setEmail(event.target.value)} /></div>

                <button onClick={handleClick} className='button mt-20' type='submit'>Start Chat</button>
            </div>
        </div>
    );
};

export default Join;