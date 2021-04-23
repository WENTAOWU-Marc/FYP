import React from 'react'

function ButtonGroups(props) {
    const { changeTravelMode } = props
    const travel_modes = ['BICYCLING', 'DRIVING', 'TRANSIT', 'TWO_WHEELER', 'WALKING']
    return (
        <>
            {travel_modes.map((mode, index) => (
                <button className="btn btn-info" style={{marginRight: 20,marginBottom: 20,}} onClick={() =>changeTravelMode(mode)}>{mode}</button>
            ))}
        </>
    )
}

export default ButtonGroups
