import Dashboard from "./components/Dashboard";
import React from 'react';
import ParticlesBg from 'particles-bg'

export default function App() {
    return (
        <div>
            <Dashboard/>
            <ParticlesBg type="circle" bg={true} />

        </div>
    )
}