import { ReactComponent as Copy } from "../images/copy.svg";
import slp from "../images/smooth-love-potion.png";

const Record = ({ account, lastPrice, deleteAccount }) => {
  const {
    in_game_slp,
    last_claim,
    lifetime_slp,
    mmr,
    name,
    next_claim,
    rank,
    ronin,
    ronin_slp,
    total_slp,
  } = account;

  const handleClick = () => {
    deleteAccount(ronin);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ronin);
  };

  return (
    <div className="record">
      <h3>Name: {name}</h3>
      <div className="wallet">
        <span>Wallet:</span>
        <a
          href={`https://marketplace.axieinfinity.com/profile/${ronin}/axie`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ronin}
        </a>
        <button onClick={handleCopy}>
          <Copy />
        </button>
      </div>

      <p>
        <span>MMR:</span>
        <strong>{mmr}</strong>
      </p>
      <p>
        <span>Rank: </span>
        <strong>#{rank}</strong>
      </p>
      <p>
        <span>SLP in Game:</span>
        <strong>{in_game_slp}</strong>
      </p>
      <p>
        <span>SLP in RONIN wallet:</span>
        <strong>{ronin_slp}</strong>
      </p>
      <p className="total">
        <img src={slp} alt="" />
        <span>SLP:</span> <strong>{total_slp}</strong>
        <span>${(total_slp * lastPrice).toFixed(4)}</span>
      </p>

      <p className="claim">
        <span>Last Claim: </span>
        <strong>{new Date(last_claim * 1000).toLocaleDateString()}</strong>
      </p>
      <p className="claim">
        <span>Next Claim:</span>{" "}
        <strong>{new Date(next_claim * 1000).toLocaleDateString()}</strong>
      </p>

      <p>
        <span>Lifetime SLP:</span>
        <strong>{lifetime_slp}</strong>
      </p>

      <button className="delete" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default Record;
