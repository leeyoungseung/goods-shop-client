import React, {useState} from 'react'
import { Button, Form, Input} from 'antd';
import FileUpload from '../../../../utils/FileUpload.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { USER_SERVER } from '../../../../../components/Config.js';
import { MakerCodes , SaleStatusList} from '../Data.js'
import RadioBox from '../Sections/RadioBox.js'
import { useSelector } from "react-redux";

const { TextArea} = Input;

function AddItemPage(props) {

    const [ItemName, setItemName] = useState("");
    const [ItemDescription, setItemDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [MakerCode, setMakerCode] = useState(1);
    const [Images, setImages] = useState([]);
    const [SaleStatus, setSaleStatus] = useState(0);
    const CreateUser = useSelector(state => state.auth.userData.email);

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

    const saleStatusChangeHandler = (status) => {
        console.log("saleStatusChangeHandler : " + status)
        setSaleStatus(status)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!ItemName || !ItemDescription || !Price || !MakerCode || !Images || !SaleStatus || !CreateUser) {
            return alert("Please Input all value.")
        }

        const body = {
            itemName: ItemName,
            itemDescription: ItemDescription,
            price: Price,
            makerCode: MakerCode,
            images: Images,
            saleStatus: SaleStatus,
            createUser: CreateUser
        }

        console.log("Request body : "+JSON.stringify(body));

        axios.post(`${USER_SERVER}/api/v1/items`, body)
            .then(response => {
                console.log(JSON.stringify(response.data))
                if (response.data.message === "Success") {
                    props.history.push('/')
                } else {
                    alert("Fail Add Item info")
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
                <TextArea rows={4} onChange={itemDescriptionChangeHandler} value={ItemDescription}/>
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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>SaleStatus : </label>
                <RadioBox list={SaleStatusList}
                        selectValue={saleStatusChangeHandler}
                    />
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