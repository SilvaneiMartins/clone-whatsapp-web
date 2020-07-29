import React from 'react'
import introImg from '../assets/intro-whatsapp.jpg'

export default function Welcome() {
    return (
        <div className="welcome">
            <img src={introImg} alt="" />
            <h2>Mantenha seu telefone conectado</h2>
        </div>
    )
}
