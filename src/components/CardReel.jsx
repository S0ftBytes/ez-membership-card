import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const CardReel = (props) => {
    const codes = props.codes;
    const currentCode = props.currentCodeIndex;

    return(
        <div className="card-reel">
            {currentCode != 0 && <button onClick={props.left}><FontAwesomeIcon icon={faArrowCircleLeft} style={{color: "#ffffff"}}/></button>}
            {currentCode < codes.length-1 && <button onClick={props.right}><FontAwesomeIcon icon={faArrowCircleRight} style={{color: "#ffffff"}}/></button>}
        </div>
    )
}

export default CardReel;