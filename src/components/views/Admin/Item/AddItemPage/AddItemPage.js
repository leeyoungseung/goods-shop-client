import React, {useState} from 'react'
import { Button, Form, Input, Radio} from 'antd';
import FileUpload from '../../../../utils/FileUpload.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const { TextArea} = Input;
const FormItem = Form.Item;

const MakerCodes = [
    { key: 1, value: "Self-production"},
    { key: 2, value: "Maker-1"},
    { key: 3, value: "Maker-2"}
]

function AddItemPage(props) {

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const [ItemName, setItemName] = useState("");
    const [ItemDescription, setItemDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [MakerCode, setMakerCode] = useState(1);
    const [Images, setImages] = useState([]);

    const itemNameChangeHandler = (event) => {
        setItemName(event.currentTarget.value)
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const makerCodeChangeHandler = (event) => {
        setMakerCode(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!ItemName || !ItemDescription || !Price || !MakerCode || !Images) {
            return alert("Please Input all value.")
        }

        const body = {
            itemName: ItemName,
            itemDescription: ItemDescription,
            price: Price,
            makerCode: MakerCode,
            images: Images
            
        }

        axios.post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert("Success upload Product info.")
                    props.history.push('/')
                } else {
                    alert("Fail upload Product info")
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2> Add Item </h2>
            </div>

            <Form onSubmit={submitHandler}>
                
                {/* DropZone */}

                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Item Name</label>
                <Input  onChange={itemNameChangeHandler} value={ItemName}/>
                <br />
                <br />
                <label>Item Description</label>
                <TextArea onChange={itemDescriptionChangeHandler} value={ItemDescription}/>
                <br />
                <br />
                <label>Price ($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <label>Maker : </label>
                <select onChange={makerCodeChangeHandler}>
                    {MakerCodes.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />


                <Button htmlType="submit">
                    확인
                </Button>
            </Form>

        </div>
    )
}

export default withRouter(AddItemPage)