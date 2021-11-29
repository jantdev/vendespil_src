import "./card.css";

function Card({ card, handleClickToMain, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleClickToMain(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front">{card.n}</div>
        <img
          className="back"
          src="./logo192.png"
          alt="Card Back"
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
}

export default Card;
