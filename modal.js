import React, {Component} from 'react' 
import Button from './button'
import firebase from 'firebase'
import config from './../Firebase.js'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';
 
class Modal extends Component{

    constructor(props){
        super(props)

        firebase.initializeApp(config)

        this.state = {
          firstname: '',
          lastname: '',
          email: '',
          contact: '',
          message: ''
        }
    }

    




    closeButton =()=> {
        document.querySelector('#displayModal').classList.add('hide')
    }

    handleChange = (e)=> {
      this.setState({[e.target.name]: e.target.value})
    }

    storeData= (e)=>{
      e.preventDefault()
      
      let data = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        contact: this.state.contact,
      }

      firebase.database().ref('users/').push(data)
      .then(data =>{
        this.setState({message: 'Your data is submitted'})
        this.closeButton()
        this.setState({firstname: ''})
        this.setState({lastname: ''})
        this.setState({email: ''})
        this.setState({contact: ''})
        this.getData()
      }).catch(err => console.log(err))
      
    } 




    render(){

        return(
            <div className='modal hide' id={this.props.ModalId}> 
            <Button btnclass='close' onClick={this.closeButton} buttontext='x'/>
              <div className='form-content'>
              <p>{this.state.message}</p>
                <form className='form'>
                  <label for='firstName'>FirstName</label><br/>
                  <input onChange={this.handleChange} placeholder='FirstName' name='firstname'/><br/>
                  <label for='lastName'>LastName</label><br/>
                  <input onChange={this.handleChange} placeholder='LastName' name='lastname'/><br/>
                  <label for='email'>Email</label><br/>
                  <input onChange={this.handleChange} placeholder='Email' name='email'/><br/>
                  <label for='contact'>Contact</label><br/>
                  <input onChange={this.handleChange} placeholder='contact' name='contact'/><br/>
                  <button onClick={this.storeData} className='button'>submit</button>
      
                </form>
              </div>
      
            </div>
        )
    }

  }

export default Modal
 
 
 
