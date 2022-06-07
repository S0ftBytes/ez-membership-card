import React from "react";
import "../styling.css"

const CardImage = (props) => {
    return (
        <div className="card-image">
            <img src={props.img} className="card-image" alt="card img"/>
        </div>
        
    )
}

export default CardImage;