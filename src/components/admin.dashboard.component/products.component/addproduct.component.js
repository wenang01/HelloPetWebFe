import React, { Component } from 'react'
// import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native'
import axios from 'axios'

export class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productname: "",
            price: 0,
            stok: 0,
            productimage: "",
            description: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImageChange = (e) => {
        this.setState({
            productimage: e.target.files[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        let filename = this.state.productimage
        console.log("nama gambar" + filename.split('/').pop())
        form_data.append('productName', this.state.productname);
        form_data.append('price', this.state.price);
        form_data.append('stok', this.state.stok);
        form_data.append('data', JSON.stringify(this.state))
        form_data.append('file', {
            uri: this.state.productimage, //Your Image File Path
            type: 'image/jpeg',
            name: filename.split('/').pop(),
        })
        form_data.append('description', this.state.desciption)
        form_data.append(' ')
        form_data.append('productImage', this.state.productimage)

        const END_POINT = 'products/add';
        axios.post("http://localhost:3030/" + END_POINT, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    };

    // addProduct(productName, price, stok, productImage, desciption, category, productGalery) {
    //     productName = "",
    //         price = 0,
    //         stok = 0,
    //         productImage = "",
    //         desciption = "",
    //         category = null,
    //         productGalery = []
    // }

    render() {
        return (
            <div>
                <h1>Add Product Form</h1>
                <label for="productname"> Title </label>
                <input type="text" name="productname" placeholder="Insert Title Product" onChangeText={(value) => {
                    this.setState({
                        productname: value
                    })
                }} />

                <label for="price"> Price </label>
                <input type="number" name="price" placeholder="Add Price for this Product" onChangeText={(value) => {
                    this.setState({
                        price: value
                    })
                }} />

                <label for="stok"> Stok </label>
                <input type="number" name="stok" placeholder="Add Stok for this Product" onChangeText={(value) => {
                    this.setState({
                        stok: value
                    })
                }} />

                <label for="productimage"> Stok </label>
                <input type="number" name="productimage" placeholder="Add Image for this Product" onChangeText={(value) => {
                    this.setState({
                        productimage: value
                    })
                }} />

                <label for="description"> Stok </label>
                <input type="textarea" name="description" placeholder="Insert Description for this Product" onChangeText={(value) => {
                    this.setState({
                        description: value
                    })
                }} />

            </div>
        )
    }
}

export default AddProduct
