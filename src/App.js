import React from 'react';
import { useState } from 'react';
import config from "./config.json";
import "./styling.css"

import CardImage from './components/CardImage';
import CardSelector from './components/CardSelector';
import CardReel from './components/CardReel';

let defaultState = {
  selectedCard: null,
  cardTracker: {},
  cardCodes: {}
};

function reducer(state = defaultState, action){
  switch(action.type){
    case("swap-card/index"): {
      const cardType = action.payload.type;
      const cardIndex = action.payload.index;
      return{
        ...state,
        cardTracker:{
          ...state.cardTracker,
          [cardType]: cardIndex
        }
      }
    }

    case("swap-card/type"): {
      const cardType = action.payload;
      return{
        ...state,
        selectedCard: cardType
      }
    }

  }
}

const App = () => {

  const getCardTypes = () => {
    return Object.keys(config).map((key) => key)
  }

  const fetchMemberCardInfo = () => {

    var setSelectedCard = false;
    for(let card in config){
      if(!setSelectedCard) defaultState.selectedCard = card;
      defaultState["cardTracker"][card] = 0;

      const codesObj = config[card]['codes'];
      let codes = Object.keys(config[card]['codes']).map((key) => [codesObj[key]])

      defaultState.cardCodes[card] = codes;
    }

    return(
      defaultState
    )
  }

  const[state, setState] = useState(fetchMemberCardInfo);

  let cardType = state.selectedCard;
  const cardCodes = state.cardCodes[cardType];
  const currentCode = cardCodes[state.cardTracker[cardType]];

  const swapCode = (direction) => {
    const currentCodeIndex = state.cardTracker[cardType];

    switch(direction){
      case("RIGHT"):
        if(currentCodeIndex < cardCodes.length-1){
          setState((currentState) => reducer(currentState, { type: 'swap-card/index', payload: {type: cardType, index: currentCodeIndex + 1} }))
        }
        break;
      case("LEFT"):
        if(currentCodeIndex > 0){
          setState((currentState) => reducer(currentState, { type: 'swap-card/index', payload: {type: cardType, index: currentCodeIndex - 1}}))
        }
        break;
        
    }

  }

  const swapType = (direction) => {
    const cardTypes = getCardTypes();
    const currentTypeIndex = cardTypes.indexOf(state.selectedCard);

    switch(direction){
      case("RIGHT"):
        if(currentTypeIndex < cardTypes.length-1){
          setState((currentState) => reducer(currentState, { type: 'swap-card/type', payload: cardTypes[currentTypeIndex +1] }))
        }
        break;
      case("LEFT"):
        if(currentTypeIndex > 0){
          setState((currentState) => reducer(currentState, { type: 'swap-card/type', payload: cardTypes[currentTypeIndex -1]}))
        }
        break;
        
    }

  }

  return (
    <div>
      <h1 className="title">EZ Memb Card</h1>
      <div className="card-body">
        <CardSelector name={cardType} currentState={state} cardTypes={getCardTypes()} left={() => swapType("LEFT")} right={() => swapType("RIGHT")}/>
        <CardImage img={"./images/" + currentCode}/>
      </div>
      <div className="card-reel">
        <CardReel codes={cardCodes} currentCodeIndex={state.cardTracker[cardType]} left={() => swapCode("LEFT")} right={() => swapCode("RIGHT")}/>
      </div>
    </div>
    
  );
}

export default App;
