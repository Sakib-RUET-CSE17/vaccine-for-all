import React, { useState } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import { useEffect } from 'react';

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://pacific-shore-29850.herokuapp.com/'

    useEffect(() => {
        const { name, email } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setEmail(email)

        socket.emit('join', { name, room: email }, () => {

        })

        return () => {
            fetch('https://young-citadel-36577.herokuapp.com/stopChat/' + email)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    socket.emit('disconnect')

                    socket.off()

                })


        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })


    }, [messages])

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar email={email} />
                <Messages messages={messages} name={name}></Messages>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
            </div>
        </div>
    );
};

export default Chat;