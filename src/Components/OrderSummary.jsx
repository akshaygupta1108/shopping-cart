import React from 'react'

import '../index.css'

class OrderSummary extends React.Component{
    


    render(){
        let data_item = this.props.passdata
        let item = 0
        let total_price = 0
        let discount = 0
        let type_discount = 0
        for(let i = 0;i<data_item.length;i++){
            item = item + data_item[i].qty
            total_price += data_item[i].qty*data_item[i].price
            discount += data_item[i].qty*(data_item[i].price*data_item[i].discount)/100
            if(data_item[i].type === 'fiction'){
                type_discount += 15*data_item[i].price/100 * data_item[i].qty
            }
        }

        return(
            <div className="column right">

            <div className="card-container">
                <div className ="card-content">
                    <div className ="card-title">
                        <h3> Total</h3>
                    </div>
                    <div className = "card-body">
                
                        <h4>Items ({item})    <span className="justify-card">:$ {total_price.toFixed(2)}</span></h4> <br/>
                        <h4>Discount      <span className="justify-card"> :-$ {discount.toFixed(2)}</span> </h4> <br/>
                        <h4>Type Discount  <span className="justify-card">:-$ {type_discount.toFixed(2)}</span> </h4> <br/>
                        <hr></hr>
                        <div className ="back-ground">
                        <h4 > Order Total  <span className="justify-card"> : $ {(total_price - discount-type_discount).toFixed(2)} </span></h4>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default OrderSummary