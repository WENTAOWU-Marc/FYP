import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

var status = {
    1: 'Order placed',
    2: 'Order completed'
}

export default function OrderInfo () {
    const us = useParams()

    const [info, setInfo] = useState({
        foods: []
    })

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
        </div>
    )
}

