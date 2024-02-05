import React from 'react'
import { Button } from '../../components'

const Landing = () => {
    return (
        <div className="flex gap-5">
            <Button action={() => console.log('hello')} style="primary">
                Primary
            </Button>
            <Button style="secondary">Secondary</Button>
            <Button style="tetriary">Tetriary</Button>
        </div>
    )
}

export default Landing
