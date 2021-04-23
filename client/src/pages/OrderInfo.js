import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../components/map';
import ButtonGroup from '../components/buttonGroup'
import { geolocated } from "react-geolocated";


var status = {
    1: 'Order placed',
    2: 'Order completed'
}

function OrderInfo(props) {
    const us = useParams()

    const [info, setInfo] = useState({
        foods: []
    })
    console.log(info)

    const [travelMode, setTravelMode] = useState(
        "WALKING"
    )

    var getCusAddress = (userId) => {
        fetch(`/users/${userId}`)
            .then(res => res.json())
            .then(res => {
                setCusAddress(res.data)
            })
    }


    var getRestAddress = (id) => {
        fetch(`/rest/${id}`)
            .then(res => res.json())
            .then(res => {
                setRestAddress(res.data)
            })
    }

    const [cusaddress, setCusAddress] = useState(
        []
    )

    console.log(cusaddress[0])

    const [restaddress, setRestAddress] = useState(
        []
    )

    // const places = [
    //     { latitude: 52.2410691, longitude:  -7.13046 },
    //     { latitude: 52.251691, longitude: -7.117269 }
    //   ]
    const places = [
        { latitude: parseFloat(cusaddress[0]), longitude: parseFloat(cusaddress[1]) },
        { latitude: parseFloat(restaddress[0]), longitude: parseFloat(restaddress[1]) }
    ]

    console.log(places)

    useEffect(() => {
        var getList = () => {
            fetch('/order/all?_id=' + us._id)
                .then(res => res.json())
                .then(res => {
                    setInfo(res.data[0])
                    getCusAddress(res.data[0].userId)
                    getRestAddress(res.data[0].restId)
                })

        }
        getList()
    }, [])

    const changeTravelMode = (mode) => {
        setTravelMode(mode)
    }

    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <p className="text-uppercase">restName: {info.restName}</p>
            <p className="text-uppercase">restTel: {info.restTel}</p>
            <p className="text-uppercase">restAddress: {info.restAddress}</p>
            <br />
            <p className="text-uppercase">userName: {info.userName}</p>
            <p className="text-uppercase">userTel: {info.userTel}</p>
            <p className="text-uppercase">userAddress: {info.userAddress}</p>
            <p className="text-uppercase">totalPrice: ${info.totalPrice}</p>
            <p className="text-uppercase">status: {status[info.status]}</p>
            <br />
            <h1> Foods </h1>
            {
                info.foods.map((it, index) => <>
                    <p className="text-uppercase">food name: {it.name} ,  food number: {it.number} , food price: {it.price} , food foodPrice: {it.foodPrice}</p>
                </>)
            }
            <h1> Route </h1>
            <ButtonGroup changeTravelMode={changeTravelMode}/>
            {((! isNaN(places[0].latitude)) && (! isNaN(places[0].longitude)) &&  (! isNaN(places[1].latitude)) && (! isNaN(places[1].longitude))) && (
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
            )}
        </div>
    )
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(OrderInfo)