import React from 'react'


function Button(props) {
    return (
    <div>
        <button onClick={props.onClick} className={props.btnclass} type="button">{props.buttontext}</button>
    </div>
    )
}


export default Button