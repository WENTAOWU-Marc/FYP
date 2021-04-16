import React, { useState, useEffect, useContext } from 'react'
import { Card, Avatar, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

export default function RestList() {
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

    // const FilterControls = props => {

    //     const handleChange = (e, type, value) => {
    //         e.preventDefault();
    //         props.onUserInput(type, value);
    //     };

    //     const handleTextChange = e => {
    //         handleChange(e, "name", e.target.value);
    //     };
    // }

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
            {/* <div className="row bg-warning">
                <div className="col-md-12">
                    <h4>
                        <span>List Filtering:</span>
                        <input
                            type="text"
                            placeholder="Name Search"
                        />
                    </h4>
                </div>
            </div> */}
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
