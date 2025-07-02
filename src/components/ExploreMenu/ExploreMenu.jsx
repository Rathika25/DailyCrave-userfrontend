import {menu_list} from'../../assets/assets'
import './ExploreMenu.css'
import React from'react'

const ExploreMenu = ({category,setCategory}) => {


    return(
        <div className='explore-menu' id="explore-menu">
            <h1>🍴Pick What You Crave</h1>
            <p className='explore-menu-text'>Handpicked categories to match your hunger mood — scroll, tap & enjoy!</p>
            <div className="explore-menu-list">
                {menu_list.map((item,index)=>{
                    return(

                        <div onClick={()=>setCategory(category=>category===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                            <img className={category===item.menu_name?'active':''} src={item.menu_image}
                             alt="" />
                            <p>{item.menu_name}</p>
                            </div>
                    )
})}
                
            </div>
            <hr/>
    
    
    </div>
    
    
    )
}
 
export default ExploreMenu