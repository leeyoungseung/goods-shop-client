import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import { USER_SERVER } from '../../components/Config.js';

function FileUpload(props) {

    const [Images, setImages] = useState([]);
    const Token = useSelector(state => state.auth.authToken);

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: { 
                'content-type': 'multipart/form-data',
                "Authorization": Token
             }
        }
        formData.append("file", files[0])

        axios.post(`${USER_SERVER}/api/v1/items/upload-image`, formData, config)
        .then(response => {
            if (response.data) {
                console.log("File Upload Success "+JSON.stringify(response.data.data))

                setImages([...Images, response.data.data])

                props.refreshFunction([...Images, response.data.data])

            } else {
                alert('Fail to save file.')
            }
        })

    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        //console.log('currentIndex', currentIndex)

        let newImages = [...Images];
        newImages.splice(currentIndex, 1) // 0부터 시작해서 1개의 인텍스의 아이템을 지우기

        setImages(newImages);

        props.refreshFunction(newImages)

    }


    return (

        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={ dropHandler }>
                { ( { getRootProps, getInputProps } ) => (
                    <section>
                        <div 
                            style={{
                                width: 300, height: 240, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem'}}/>
                        </div>
                    </section>
                )}

            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                
                {Images.map((image, index) => (
                    <div key={index}>
                        <img onClick={() => deleteHandler(image)}
                        style={{ minWidth: '300px', width: '300px', height: '240px' }} 
                        src={`http://localhost:8080/api/v1/items/preImage/${image}`}
                        />

                    </div>
                ))}

            </div>
            
        </div>
    );  
}

export default FileUpload;