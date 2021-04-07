import React , {useState} from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props)  {

    const [Value, setValue] = useState(0);

    const renderRadiobox = () => (
        props.list && props.list.map(value => (
            <Radio key={value.id} value={value.id}> {value.name} </Radio>
        ))
    )

    const handleChange = (event) => {
        console.log("radio value : "+event.target.value)
        setValue(event.target.value)
        props.selectValue(event.target.value)
    }


    return (
            <Radio.Group onChange={handleChange} value={Value}>
                    {renderRadiobox()}
                </Radio.Group>

    );
}

export default RadioBox