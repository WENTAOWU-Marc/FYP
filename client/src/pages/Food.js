import { Card, Col, Row, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStorage } from 'reactfire';
import 'firebase/auth'
import 'firebase/storage';

export default function Food() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    const { restId } = useParams()

    const storageRef = useStorage().ref();

    const [list, setList] = useState([])
    const [info, setInfo] = useState({})

    const [file, setFile] = useState(null)
    const [food, setFood] = useState({
        restId,
        name: '',
        type: 'meat',
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

        if (!user) {
            window.location.href = '/login'
        }

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

        if (file) {
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

                    if (fdata._id) {
                        fetch('/food/update', {
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
                    } else {

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
                    }

                })
            });
        } else {
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
            fdata.imgUrl = food.imgUrl
            console.log('shop -> :', fdata)

            if (fdata._id) {
                fetch('/food/update', {
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
            } else {

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
            }

        }

    }

    const style1 = {
        marginRight: '160px'
    }

    const style2 = {
        marginLeft: '20px',
        marginRight: '160px'

    }
    const style3 = {
        width: '100%',
        height: '250px'

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
        <div >
            <div className="panel panel-default shadow p-3 mb-5 bg-white rounded">
                <label style={style2}>
                    <div >
                        <h4 className="panel-body">
                            Name
                          </h4>
                        <div className="panel-footer">{info.name}</div>
                    </div>

                </label>

                <label style={style1}>
                    <div>
                        <h4 className="panel-body">
                            Address
                          </h4>
                        <div className="panel-footer">{info.address}</div>
                    </div>
                </label>
                <label style={style1}>
                    <div >
                        <h4 className="panel-body">
                            Tel
                          </h4>
                        <div className="panel-footer">{info.tel}</div>
                    </div>
                </label>
                <label >
                    <div >
                        <h4 className="panel-body">
                            Type
                          </h4>
                        <div className="panel-footer">{info.type}</div>
                    </div>
                </label>
            </div>

            {
                user && user.role == 2 &&
                  <div className="shadow p-3 mb-5 bg-white rounded">
                    <h1>Create a foods</h1>
                    <form onSubmit={handleSubmit} className="form-group">
                        <p className="text-uppercase">
                            name:
                        <input type="text" value={food.name} className="form-control" placeholder="Name" name="name" onChange={handleChange} />
                        </p>
                        <p className="text-uppercase">
                            imgUrl:&nbsp;&nbsp;
                        <input type="file" name="file" onChange={fileChange} />
                        </p>
                        <p className="text-uppercase">
                            price:
                        <input type="number" value={food.price} className="form-control" placeholder="price" name="price" onChange={handleChange} />
                        </p>
                        <p className="text-uppercase">
                            type:&nbsp;&nbsp;
                        <select name="type" value={food.type} onChange={handleChange}>
                                <option value="meat">meat</option>
                                <option value="vegetables">vegetables</option>
                            </select>
                        </p>
                        <button type="submit" className="btn btn-info">Create</button>
                    </form>
                </div>
            }

            <div>
                <Row style={{ margin: '10px' }} gutter={16}>
                    {
                        list.map((it, index) => (
                            <Col span={8} key={index} style={{ margin: '10px 0' }}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            style={style3}
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
                                    <InputNumber onChange={(e) => onChange(e, it, index)} />
                                    <p>$ {it.foodPrice}</p>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div >
            <div><button style={style2} type="button" className="btn btn-info" onClick={() => toBuy()}> Buy </button></div>
        </div >
    )
}