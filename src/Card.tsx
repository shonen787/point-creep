import {CardObj} from "./types";

const Card = (props: CardObj) => {
    
    return(
       <div className="card"> 
            <img src={props.image_uri} alt={props.name}></img>
            
            <div><span>Point(s):</span>{props.points}</div>
        </div>
    );
};

export default Card;