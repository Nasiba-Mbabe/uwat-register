import React from 'react';
import Header from './Components/Header'
import Content from './Components/Content'
import Footer from './Components/Footer'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function App(){
  return(

    <div>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default App;