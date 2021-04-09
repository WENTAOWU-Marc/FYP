import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

export default function Home () {

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



    function onChange (a, b, c) {
        console.log(a, b, c);
    }


    const contentStyle = {
        width: "100%",
        height: '460px',
        color: '#fff',
        lineHeight: '460px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <>
            <Carousel afterChange={onChange} >
                {
                    list.map((it, index) => (
                        <Link key={index} to={"/foods/" + it._id} >
                            <div>
                                <img style={contentStyle} src={it.imgUrl} alt="" />
                            </div>
                        </Link>

                    ))
                }
            </Carousel>
        </>
    )
}
