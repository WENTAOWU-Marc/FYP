import React, { useState } from 'react';
import { useStorage } from 'reactfire';
import 'firebase/auth'
import 'firebase/storage';


export default function AddRest() {

    const storageRef = useStorage().ref();

    const [file, setFile] = useState(null)

    // User State
    const [shop, setShop] = useState({
        name: '',
        address: '',
        tel: '',
        type: 'Chinese food',
        longitude: '',
        latitude: '',
    });

    const [error, seterror] = useState('')

    const handleChange = e => {
        setShop({
            ...shop,
            [e.target.name]: e.target.value,
        })
    };
    const fileChange = e => {
        e.persist();
        setFile({
            file: e.target.files[0],
        })
    };

    // onChange function
    const handleSubmit = async (e) => {
        e.preventDefault();
        var imgUrl = ''

        var uploadTask = storageRef.child('restaurants/' + file.file.name).put(file.file, {
            contentType: 'image/png'
        }).then((snapshot) => {
            var downRef = storageRef.child('restaurants/' + file.file.name)
            downRef.getDownloadURL().then(function (imgUrl) {
                imgUrl = imgUrl;
                if (
                    !shop.name ||
                    !shop.address ||
                    !shop.tel ||
                    !shop.type ||
                    !shop.latitude ||
                    !shop.longitude
                ) {
                    seterror('Parameter cannot be empty');
                    return false;
                }

                var fdata = { ...shop }
                fdata.imgUrl = imgUrl
                console.log('shop -> :', fdata)

                fetch('/rest/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)
                })
                    .then(res => res.json())
                    .then(res => {
                        seterror(res.msg)
                    })
            })
        });

    }


    return (
        <div>
            <h1>Create a restaurant</h1>

            <form onSubmit={handleSubmit} className="form-group">
                <p className="text-uppercase">
                    name:
                    <input type="text" className="form-control" placeholder="Input Name" name="name" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    imgUrl:                 
                </p>
                <input type="file" name="file" onChange={fileChange} />
                <p></p>
                <p className="text-uppercase">
                    address:
                    <input type="text" className="form-control" placeholder="Input address" name="address" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    tel:
                    <input type="tel" className="form-control" placeholder="Input tel" name="tel" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    type:
                    <select name="type" onChange={handleChange} className="form-control" >
                        <option value="Chinese food">Chinese food</option>
                        <option value="Western food">Ireland food</option>
                        <option value="American fast food">American fast food</option>
                    </select>
                </p>

                <p className="text-uppercase">
                    longitude:
                    <input type="number" className="form-control" step="0.0000001" placeholder="Input longitude" name="longitude" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    latitude:
                    <input type="number" className="form-control" step="0.0000001" placeholder="Input latitude" name="latitude" onChange={handleChange} />
                </p>

                <button type="submit" className="btn btn-info">Create</button>

            </form>
            {error && <h4>{error}</h4>}



        </div>
    )
}
