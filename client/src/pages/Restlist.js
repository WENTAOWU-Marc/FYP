import React, { useState, useEffect } from 'react'
import { Card, Avatar, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

export default function RestList () {
    const [list, setList] = useState([])
    useEffect(() => {
        var getList = () => {
            fetch('/rest/all')
                .then(res => res.json())
                .then(res => {
                    var Arr = res.data
                    // .splice(5)
                    setList(Arr)
                })
        }
        getList()
    }, [])


    const contentStyle = {
        width: "100%",
        height: '460px',
        color: '#fff',
        lineHeight: '460px',
        textAlign: 'center',
        background: '#364d79',
        margin: '20px',
    };

    return (
        <>
            <Row style={{ margin: '10px' }} gutter={16}>
                {
                    list.map((it, index) => (
                        <Col span={8} key={index}>
                            <Link to={"/foods/" + it._id} >
                                <Card
                                    cover={
                                        <img
                                            alt="example"
                                            src={it.imgUrl}
                                        />
                                    }
                                >
                                    <Card.Meta
                                        title={it.name}
                                        description={it.type}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
