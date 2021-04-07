import { Card, Col, Row, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Food () {
    const { restId } = useParams()

    const [list, setList] = useState([])

    const [file, setFile] = useState(null)
    const [food, setFood] = useState({
        restId,
        name: '',
        imgUrl: 'data:image/jpeg;base64,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',
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
    const onChange = (e) => {

    }
    const editInfo = (e) => {
        setFood({ ...e })
    }

    const fileChange = e => {
        e.persist();
        setFile({
            ...food,
            [e.target.name]: e.target.files[0],
        })
    };

    const [error, seterror] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();


        // var file = shop.file

        // var uploadTask = storageRef.child('restaurants/' + file.name).put(file, {
        //     contentType: 'image/png'
        // }).then((snapshot) => {
        //     console.log('snapshot -> :', snapshot)
        //     console.log('Uploaded a blob or file!');
        // });

        if (
            !food.name ||
            !food.type ||
            !food.price
        ) {
            seterror('Parameter cannot be empty');
            return false;
        }

        food.price = Number(food.price)

        console.log('shop -> :', food)

        // fetch('/food/add', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(food)
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         window.location.reload()
        //     })
    }


    useEffect(() => {
        var getlist = () => {
            fetch('/food/all?restId=' + restId)
                .then(res => res.json())
                .then(res => {
                    setList(res.data)
                })
        }
        getlist()
    }, [])

    return (
        <div>
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


            <div>
                <Row style={{ margin: '10px' }} gutter={16}>
                    {
                        list.map((it, index) => (
                            <Col span={8} key={index}>
                                <Card
                                    cover={
                                        <img
                                            alt="example"
                                            src={it.imgUrl}
                                        />
                                    }
                                    actions={[
                                        <span key="edit" onClick={() => editInfo(it)}>edit</span>,
                                        <span key="buy">
                                            <InputNumber min={1} max={10} onChange={onChange} />
                                            <button>Buy</button>
                                        </span>
                                    ]}
                                >
                                    <Card.Meta
                                        title={it.name}
                                        description={it.type}
                                    />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>

        </div>
    )
}