
import React from 'react'
import 'react-bootstrap'
import Items from './Items'
import OrderSummary from './OrderSummary'
import {Modal,Button} from 'react-bootstrap'

const data = require('../Data.json')
//console.log(data)
class Order extends React.Component{
    
    constructor(){
        super()
        this.state = {
            mem : data,
            visibility : false,
            message : ''
        }
        console.log(this.state.mem)
        this.popup = this.popup.bind(this)
    }

    popup(item_name){
        this.setState({
            visibility : true,
            message : item_name
        })
    }
    setPopUp(){
        this.setState({
            visibility : false,
            message : ''
        })
    }

    render(){
            // if(this.state.visibility == false){
            //     this.popup()
            // }
            return(
                <div>
                { this.state.visibility == true && 
                    
                    <Modal.Dialog >
                    <Modal.Header >
                    <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                    <p> You have deleted {this.state.message} from the Cart</p>
                    </Modal.Body>
                
                    <Modal.Footer>
                    <Button variant="secondary" onClick = {()=>this.setPopUp()}>Close</Button>
                    </Modal.Footer>
                    </Modal.Dialog> 
                }
                <h2> Order Summary</h2>
                {/* <div className="img-name-del">
                    <span> Item figure , Item Name ,Item Type , Qty , price</span>
                </div> */}
                <Items data = {this.state.mem} showPopUp = {this.popup} />
            </div>    
            )
    }
}
export default Order