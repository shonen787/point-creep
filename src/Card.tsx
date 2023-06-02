import { CardObj } from "./types";

const Card = (props: CardObj) => {
  return (
    <>
      <div className={`card `}>
        <img
          className={props.selection}
          src={props.image_uri}
          alt={props.name}
          onClick={props.onClick}
        ></img>
        <p className="points">Point(s): {props.points}</p>
      </div>
    </>
  );
};

export default Card;
