import React from 'react'

export default function ToDoneItem(props) {

    const data = props.item;

    return (
        <div className='todones-item'>
            <p>{data.text}</p>
            <div className='actions'>
                <button className='btn' onClick={() => props.updateItem(data.id)}>
                    &#8635;
                </button>
            </div>
        </div>
    )
}
