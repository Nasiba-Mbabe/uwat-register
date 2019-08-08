import React from 'react'


function Input(props) {
    return (
    <div>
        <input onChange={props.onChange} name={props.name} className={props.inputclass} type={props.type} placeholder={props.placeholder}/>
    </div>
    )
}


export default Input