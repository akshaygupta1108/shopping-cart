import React   from 'react'
import {Modal,Button} from 'react-bootstrap'
import OrderSummary from './OrderSummary'
import '../index.css'

import {Dialog , DialogTitle , DialogContent ,makeStyles} from '@material-ui/core'



class Items extends React.Component{

    constructor(props){
        super(props)

        //let copy_temp = Object.assign({},this.props.data)
        let copy_temp = []
        for(let i = 0;i<this.props.data.length;i++){
            let tempo = this.props.data[i]
            copy_temp.push({...tempo,'qty':1,vis : false})

        }
        
        console.log(copy_temp)

        this.state={
            mem : copy_temp    
        }
            


        
        console.log(this.state.mem)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.delete = this.delete.bind(this)
    
    }

    increment(item_id){
        this.setState((prevState => {
                let items = prevState.mem.filter(item => {
                    if(item.id === item_id)
                        return item
                })
                     
                items[0].qty = items[0].qty + 0.5;
                console.log(items[0].qty)
                    return prevState
                }
                       
            ),()=> this.addtoLocalStorage(this.state.mem)

        
        )
        
        console.log(this.state.mem)
    }

    decrement(item_id){
        this.setState((prevState => {
            let items = prevState.mem.filter(item => {
                if(item.id === item_id)
                    return item
            })
                 
            if(items[0].qty === 1 ){
                return prevState
            }
            items[0].qty = items[0].qty-0.5;
            console.log(items[0].qty)
                return prevState
            }
                   
        ),()=> this.addtoLocalStorage(this.state.mem)
    )
    this.addtoLocalStorage(this.state.mem)
    console.log(this.state.mem)
        
    }

    
    delete(item_id,item_name){
        
        this.props.showPopUp(item_name)
        let copy_temp = []
        for(let i = 0;i<this.state.mem.length;i++){
            let tempo = this.state.mem[i]
            copy_temp.push({...tempo,})

        }
        let temp = -1
        for(let i = 0;i<this.state.mem.length;i++){
            if(this.state.mem[i].id === item_id){
                temp = i;
            }
        }
        copy_temp.splice(temp,1)
        
        this.setState({
            mem: copy_temp
        },
        ()=> this.addtoLocalStorage(this.state.mem)
        )
        
    }

    reload(){
        let copy_temp = []
        for(let i = 0;i<this.props.data.length;i++){
            let tempo = this.props.data[i]
            copy_temp.push({...tempo,'qty':1})

        }
        this.setState({
            mem: copy_temp
        },()=>this.addtoLocalStorage(this.state.mem))
    }

    addtoLocalStorage(mem){
        const saveState = JSON.stringify(mem)
        localStorage.setItem('saveState',saveState)

    }

    getLocalStorage(){
        return JSON.parse(localStorage.getItem('saveState'))    
    }

    componentDidMount(){
        let copy_temp = []
        for(let i = 0;i<this.props.data.length;i++){
            let tempo = this.props.data[i]
            copy_temp.push({...tempo,'qty':1,vis : false})

        }
        if(this.getLocalStorage() == null)
            this.setState({mem : copy_temp})
        else
            this.setState({
                mem : this.getLocalStorage()
            })
        
    }


    render(){
        
        if(this.state.mem.length == 0){
            return (
                <div>
                    <h5> Oops, Seems like you dont have any item in Cart , click to Reload</h5>
                    <button onClick={()=> this.reload()}>reload</button>
                </div>
                
            )
        }
        let data_json = this.state.mem.map(item => {
            return (
                
                    <div key={item.id}>
                        
                        <div className = "img-name-del">
                            {/* <ul className ="first-list">
                            <li><img src = {item.img_url} alt=""></img> </li>
                            <li><h5> {item.name} {item.type}</h5></li>
                            
                            <li><button onClick={()=> this.delete(item.id,item.name) } > X </button></li> 
                            </ul> */}
                            <span class="get-margin"><img src = {item.img_url} alt=""></img> {item.name} {item.type} <button class ="lift" onClick={()=> this.delete(item.id,item.name) } > X </button> </span> 
                        
                            {/* <ul className = "second-list">
                            <li><button onClick={()=> this.decrement(item.id)}> -</button></li>
                            <li><h4>{item.qty}</h4></li>
                            <li><button onClick={()=> this.increment(item.id)}> +</button></li>
                            </ul> */}
                            <span class = "get-margin-right">
                                <button class ="lift indi" onClick={()=> this.decrement(item.id)}> -</button>
                                <span>{item.qty}</span>
                                <button class ="lift indi" onClick={()=> this.increment(item.id)}> +</button>
                                <strong class ="indi">{item.price*item.qty}</strong>
                            </span>
                        </div>
                        
                    </div>
                                         
                )
            }
        )

        
        return (
            <div className="row">
                
                 <OrderSummary passdata = {this.state.mem} />
                <div className ="column left"> <div className ="img-name-del">
                    <span className="get-margin-text indi-text"> Item Name</span>
                    <span className="get-margin-right-text "><span className="indi-text">Qty</span><span className="indi-text"> Price</span></span>
                </div>{data_json} </div>
                
                
            </div>
        )
    }
}


export default Items



                // <div key = {item.id}>
                    
                //     <h1>  <img src = {item.img_url} ></img>{item.name} {item.price} {item.qty}</h1>
                //     <button onClick = {()=> this.increment(item.id)}>increment</button>
                //     <button onClick = {()=> this.decrement(item.id)}>decrement</button>
                //     <button onClick = {()=> this.delete(item.id)}> delete</button>
                // </div> 



                // <div key={e.id}>
                //                 <span>{e.name} <button onClick={()=>deleteItem(index)}>X</button>{e.type} </span> 
                //                 <button onClick={(e)=>update(index, -1)}>-</button>
                //                 <span> {e.count} </span>
                //                 <button onClick={(e)=>update(index, 1)}>+</button>
                //                 <span> {e.price} </span>
                //             </div>


                // function Items(props){
    
//     const data_json = props.data.map(item => {
//     return (
//         <div>
//             <h1>  <img src = {item.img_url} ></img>{item.name} {item.price} </h1>
            
//         </div>    
//         )
//     }
//     )
//     return(
//         <div> {data_json}</div>
//     )

// }