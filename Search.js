import React, {Component} from 'react'
import Input from './Input'
import firebase from 'firebase'
import config from './../Firebase.js'


class Search extends Component {
    constructor(props){
        super(props)
        if (!firebase.apps.length){
            firebase.initializeApp(config);
        }

        this.state = {

            users: [],
            results: [],
            today: []
        }

    }

    componentDidMount(){
        this.getDataOnMount()
        this.getData();
        
    }
    // Get all the users in the database

    getDataOnMount = () => {
        let result = [];
        firebase.database().ref('users/').once('value', (snapshot)=> {
            Object.keys(snapshot.val()).forEach(key => {
                let item = snapshot.val()[key]
                result.push(item);
            })
            this.setState({users: result})

            console.log(this.state.users)
        })
    }

    // Store the user after he/she searches for name

    registerData = (data) => {
        let today = new Date()
        data.time = `${today.getHours()} : ${today.getMinutes()}` 
        let visitor = []
        visitor.push(data)
        this.setState({today: visitor})
        console.log(data)

        let name = `${today.getDate()} ${today.getMonth()} ${today.getYear()}/`

        firebase.database().ref('todayList').push(data)
       .then(data => {
           this.getData()
       }).catch(err => console.log(err))

    }

    // Get all registered users for that day
    
    getData = () => {
        let result = [];
        firebase.database().ref('todayList/').once('value', (snapshot)=> {
            if(snapshot.val()){
                Object.keys(snapshot.val()).forEach(key => {
                    let item = snapshot.val()[key]
                    result.push(item);
                })
                this.setState({today: result})
            }
        })
    }

    
    // get the value of the search input
    
    handleChange = (e) => {
        let search = e.target.value
        if(search.length > 3){
            const allUsers = this.state.users
            const searchData = allUsers.filter((data)=> {
                return data.firstname.includes(search)
            })
            this.setState({results: searchData})
            console.log(this.state.results)
        }
    }

            

        render(){
            const dropList = this.state.results
            const dropData = dropList.map((data, index) => (
                <li key={index} onClick={() => this.registerData(data)}>{data.firstname} {data.lastname} <small><i>({data.email})</i></small></li>
            ))

            const todayList = this.state.today.map((data, index) => (
                <li key={index}>{data.firstname} {data.lastname} <small><strong>{data.time}</strong></small></li>
            ))

            // return(
    //             <div>
    //                 <div className="content-item">
    //                     <div className="row">
    //                         <div className= "search">
    //                             <div className="col-md-6">
    //                                 <Input inputclass='input-box' type='text' placeholder='search firstname...' onChange={this.handleChange}/>
    //                                 <div className='drop-down'>
    //                                     <ul>
    //                                         {dropData}
    //                                     </ul>
    //                                 </div>
    //                             </div>
                
    //                         </div>
    //                         <div className="col-md-6 register-box">
    //                                 <h4 className='register-text'>Register</h4>
    //                             <div className='members-container'>
    //                               {todayList}
    //                             </div>
    //                         </div>

    //                     </div>

    //                 </div>

    //             </div>
            
    //         )

    //     }
    // }

        return (
            <div>
                 <div className="content-item search">
                    <span className='search-item'>
    
                        <Input inputclass='input-box' type='text' placeholder='search name...' onChange={this.handleChange}/>
            
                    </span>
                         <span><i></i></span>
                   <div className='drop-down'>
                        <ul>
                            {dropData}
                        </ul>
                   </div>
                 </div>

                <div>
                    <div className='cotent-item register-box'>
                        <h4 className='register-text'>Members</h4>
                        <div className='members-container'>
                            <ul>
                                {todayList}
                            </ul>
                            
                        </div>
                    </div>
                 </div>
            </div>
        )

    }
}
            
export default Search