import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


var status = {
    1: 'Order placed',
    2: 'Order completed'
}

export default function Food () {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    // const { restId } = useParams()

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
                        <th>Restaurant Name</th>
                        <th>Restaurant Tel</th>
                        <th>Restaurant Address</th>
                        <th>Order TotalPrice</th>
                        <th>Order Status</th>
                        {
                            user.role == 1 &&
                            <th>Action</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((it, index) => (
                            <tr key={index}>
                                <td><Link to={'/orders/' + it._id}>{index + 1}</Link> </td>
                                <td>{it.restName}</td>
                                <td>{it.restTel}</td>
                                <td>{it.restAddress}</td>
                                <td>{it.totalPrice}</td>
                                <td>{status[it.status]}</td>
                                <td>
                                    {
                                        user.role == 1 && user._id == it.userId &&
                                        <button disabled={it.status == 2} button onClick={() => changeStatus(it)} >Ok</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}
