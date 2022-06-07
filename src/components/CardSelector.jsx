import React from "react";
import config from "../config.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const CardSelector = (props) => {
    let selectedCardName = config[props.name].name;
    let selectedCardColour = config[props.name].colour;

    let selectedTypeIndex = props.cardTypes.indexOf(props.name);

    return (
        <div className="card-type">
            {selectedTypeIndex > 0 && <FontAwesomeIcon icon={faCaretLeft} className="card-type--selector" onClick={props.left}/>}
            <h2 style={{color: selectedCardColour}}>{selectedCardName}</h2>
            {selectedTypeIndex < props.cardTypes.length -1 && <FontAwesomeIcon icon={faCaretRight} className="card-type--selector" onClick={props.right}/>}
        </div>
    )
}

export default CardSelector;