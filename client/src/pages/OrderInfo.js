import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../components/map';
import { geolocated } from "react-geolocated";


var status = {
    1: 'Order placed',
    2: 'Order completed'
}

function OrderInfo (props) {
    const us = useParams()

    const [info, setInfo] = useState({
        foods: []
    })

    const [travelMode, setTravelMode] = useState("WALKING")

    const places = [
        { latitude: 52.2410691, longitude:  -7.13046 },
        { latitude: 52.251691, longitude: -7.117269 }
      ]

    useEffect(() => {
        var getList = () => {
            fetch('/order/all?_id=' + us._id)
                .then(res => res.json())
                .then(res => {
                    setInfo(res.data[0])
                })
        }
        getList()
    }, [])


    const changeTravelMode = (mode)=>{
        console.log(mode)
        setTravelMode(mode)
    }

    return (
        <div>
            <p>restName: {info.restName}</p>
            <p>restTel: {info.restTel}</p>
            <p>restAddress: {info.restAddress}</p>
            <br />
            <p>userName: {info.userName}</p>
            <p>userTel: {info.userTel}</p>
            <p>userAddress: {info.userAddress}</p>
            <p>totalPrice: ${info.totalPrice}</p>
            <p>status: {status[info.status]}</p>
            <br />
            <h1> foods </h1>
            {
                info.foods.map((it, index) => <>
                    <p>food name: {it.name} ,  food number: {it.number} , food price: {it.price} , food foodPrice: {it.foodPrice}</p>
                </>)
            }
            <Map
        googleMapURL={
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyCVap7jbQhstEe08Re8WLX0BzIl6FZwH0o&v=3.exp&libraries=geometry,drawing,places`
        }
        markers={places}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: "80vh" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultCenter={{ lat: 25.798939, lng: -80.291409 }}
        defaultZoom={11}
        travelMode={travelMode}
      />
        </div>
    )
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(OrderInfo)