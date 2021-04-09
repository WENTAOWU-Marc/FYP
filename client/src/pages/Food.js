import { Card, Col, Row, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStorage } from 'reactfire';
import 'firebase/auth'
import 'firebase/storage';

export default function Food () {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    const { restId } = useParams()

    const storageRef = useStorage().ref();

    const [list, setList] = useState([])
    const [info, setInfo] = useState({})

    const [file, setFile] = useState(null)
    const [food, setFood] = useState({
        restId,
        name: '',
        type: 'vegetables',
        price: 0,
        _id: '',
    });

    const handleChange = (e) => {
        setFood({
            ...food,
            [e.target.name]: e.target.value,
        })
    }
    const onChange = (e, obj, index) => {
        obj.number = e
        obj.foodPrice = Number(obj.number) * Number(obj.price)
        var newList = list.map(it => {
            if (it._id == obj._id) {
                it = { ...obj }
            }
            return it
        })
        setList([
            ...newList
        ])

    }
    const editInfo = (e) => {
        setFood({ ...e })
    }

    const fileChange = e => {
        e.persist();
        setFile({
            file: e.target.files[0],
        })
    };

    const toBuy = e => {

        // if (!user) {
        //     window.location.href = '/login'
        // }

        var foodsList = list.filter(it => it.number).map((it, index) => ({
            number: it.number,
            price: it.price,
            foodPrice: it.foodPrice,
            name: it.name,
            foodId: it._id,
        }))

        var totalPrice = foodsList.reduce((a, b) => { return a + Number(b.foodPrice) }, 0)

        var userId = user._id

        var data = {
            restId,
            foods: foodsList,
            userId,
            status: 1,
            totalPrice,
        }
        console.log('data -> :', data)

        fetch('/order/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                window.location.reload()
            })
    };

    const delInfo = e => {
        var { _id, } = e;

        fetch('/food/del?_id=' + _id)
            .then(res => res.json())
            .then(res => {
                window.location.reload()
            })
    };

    const [error, seterror] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();


        var imgUrl = ''

        var uploadTask = storageRef.child('foods/' + file.file.name).put(file.file, {
            contentType: 'image/png'
        }).then((snapshot) => {
            var downRef = storageRef.child('foods/' + file.file.name)
            downRef.getDownloadURL().then(function (imgUrl) {
                imgUrl = imgUrl;
                if (
                    !food.name ||
                    !food.type ||
                    !food.price
                ) {
                    seterror('Parameter cannot be empty');
                    return false;
                }

                food.price = Number(food.price)
                var fdata = { ...food }
                fdata.imgUrl = imgUrl
                console.log('shop -> :', fdata)

                fetch('/food/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)
                })
                    .then(res => res.json())
                    .then(res => {
                        window.location.reload()
                    })
            })
        });

    }


    useEffect(() => {
        var getlist = () => {
            fetch('/food/all?restId=' + restId)
                .then(res => res.json())
                .then(res => {
                    var data = res.data.map(it => {
                        it.totalPrice = 0;
                        it.number = null;
                        return it
                    })
                    setList(data)
                })

            fetch('/rest/all?_id=' + restId)
                .then(res => res.json())
                .then(res => {
                    console.log('data[0] -> :', res.data[0])
                    setInfo(res.data[0])
                })

        }
        getlist()
    }, [])

    return (
        <div>
            <div>
                <p>
                    Name:{info.name}
                </p>
                <p>
                    address:{info.address}
                </p>
                <p>
                    tel:{info.tel}
                </p>
                <p>
                    type:{info.type}
                </p>
            </div>
            {
                user && user.role == 2 &&
                <div>
                    <h1>Create a foods</h1>
                    <form onSubmit={handleSubmit}>
                        <p>
                            name:
                        <input type="text" value={food.name} placeholder="Name" name="name" onChange={handleChange} />
                        </p>
                        <p>
                            imgUrl:
                        <input type="file" name="file" onChange={fileChange} />
                        </p>
                        <p>
                            price:
                        <input type="number" value={food.price} placeholder="price" name="price" onChange={handleChange} />
                        </p>
                        <p>
                            type:
                        <select name="type" value={food.type} onChange={handleChange}>
                                <option value="vegetables">vegetables</option>
                                <option value="meat">meat</option>
                            </select>
                        </p>
                        <button type="submit">Create</button>
                    </form>
                </div>
            }

            <div>
                <div><button type="button" onClick={() => toBuy()}> Buy </button></div>
                <Row style={{ margin: '10px' }} gutter={16}>
                    {
                        list.map((it, index) => (
                            <Col span={8} key={index} style={{ margin: '10px 0' }}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt="example"
                                            src={it.imgUrl}
                                        />
                                    }
                                    actions={[
                                        (user && user.role == 2) ? <span key="edit" onClick={() => editInfo(it)}>edit</span> : null,
                                        (user && user.role == 2) ? <span key="del" onClick={() => delInfo(it)}>del</span> : null
                                    ]}
                                >
                                    <Card.Meta
                                        title={it.name}
                                        description={it.type}
                                    />
                                    <p>$ {it.price}</p>
                                    <InputNumber min={1} onChange={(e) => onChange(e, it, index)} />
                                    <p>$ {it.foodPrice}</p>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div >

        </div >
    )
}
