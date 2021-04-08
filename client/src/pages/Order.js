import { Card, Col, Row, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


var status = {
    1: 'Order placed',
    2: 'Order completed'
}

export default function Food () {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    const { restId } = useParams()

    const [list, setList] = useState([])

    var getlist = () => {
        fetch('/order/all')
            .then(res => res.json())
            .then(res => {
                var data = res.data.map(it => {
                    return it
                })
                console.log('data -> :', data)
                setList(data)
            })

    }
    useEffect(() => {
        getlist()
    }, [])

    const changeStatus = (row) => {
        fetch('/order/update?_id=' + row._id + '&status=2')
            .then(res => res.json())
            .then(res => {
                getlist()
            })
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Food Name</th>
                        <th>Food Price</th>
                        <th>Food Number</th>
                        <th>Restaurant Name</th>
                        <th>Restaurant Tel</th>
                        <th>Restaurant Address</th>
                        <th>User Name</th>
                        <th>User Tel</th>
                        <th>User Address</th>
                        <th>Order Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((it, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{it.name}</td>
                                <td>{it.totalPrice}</td>
                                <td>{it.number}</td>
                                <td>{it.restName}</td>
                                <td>{it.restTel}</td>
                                <td>{it.restAddress}</td>
                                <td>{it.userName}</td>
                                <td>{it.userTel}</td>
                                <td>{it.userAddress}</td>
                                <td>{status[it.status]}</td>
                                <td>
                                    <button onClick={() => changeStatus(it)} >Ok</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}