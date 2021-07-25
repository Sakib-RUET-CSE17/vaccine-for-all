import React from 'react';
import { useHistory } from 'react-router-dom';

import closeIcon from '../../../icons/closeIcon.png'
import onlineIcon from '../../../icons/onlineIcon.png'

import './InfoBar.css'

const InfoBar = ({ email }) => {
    const history = useHistory()
    const handleClick = () => {
        // fetch('https://young-citadel-36577.herokuapp.com/stopChat/' + email)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         history.push('/')
        //     })
        history.push('/')
    }
    return (
        <div className='infoBar'>
            <div className="leftInnerContainer">
                <img className='onlineIcon' src={onlineIcon} alt="online" />
                <h3>Live Chat</h3>
            </div>
            <div className="rightInnerContainer">
                <button onClick={handleClick} className="btn btn-danger"><img src={closeIcon} alt="close" /></button>
            </div>
        </div>
    );
};

export default InfoBar;