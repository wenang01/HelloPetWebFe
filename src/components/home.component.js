import React, { Component } from "react";

import UserService from "../services/user.service";

// window.chat_id = 'superhero5';
// window.chat_name = 'Cyclops';
// window.chat_avatar = 'USER_AVATAR';
// window.chat_link = 'USER_PROFILELINK';
// window.jqcc.cometchat.init();

// window.chat_id = 'USER_UID';
// window.chat_name = 'USER_NAME';
// window.chat_avatar = 'USER_AVATAR';
// window.chat_link = 'USER_PROFILELINK';

// var js = document.createElement('script'); js.type = 'text/javascript'; js.src = 'https://fast.cometondemand.net/' + window.chat_appid + 'x_xchatx_xcorex_xembedcode.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(js, s);
// js.onload = function () {
//     window.chat_iframe.style = 'width:' + window.chat_width + ';height:' + window.chat_height + ';max-width:100%;border:1px solid #CCCCCC;border-radius:5px;overflow:hidden;'; window.chat_iframe.module = 'synergy'; window.chat_iframe.width = window.chat_width.replace('px', ''); window.chat_iframe.height = window.chat_height.replace('px', ''); window.chat_iframe.src = 'https://' + window.chat_appid + '.cometondemand.net/cometchat_embedded.php';
//     if (typeof (window.addEmbedIframe) == "function") {
//         window.addEmbedIframe(window.chat_iframe);
//     }
// }


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    readDataProduct() {

    }

    componentDidMount() {

        UserService.getPublicContent().then(

            response => {
                // const data = Object.values(response.data['model']);
                // Array.values(response.data)
                this.setState({
                    content: response.data
                    // content: JSON.stringify(response.data)
                    // content: Array.prototype.map(response.data)
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
