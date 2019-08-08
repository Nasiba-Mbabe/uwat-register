import React, {Component} from 'react';
import Button from './button.js';
import Logo from './logo.js';
import Modal from './modal.js';

 
class Header extends Component{

    constructor(props){
        super(props)
    }

    openModal = () => {
        document.querySelector('#displayModal').classList.remove('hide')
    }

    render(){
      return(
        <div>
            <div className="header">
                 <Logo/>
                <Button onClick={this.openModal} buttontext='Add record..' btnclass='button'/> 
             </div>
             <Modal ModalId='displayModal' />
        </div>
    )
}

}

export default Header
