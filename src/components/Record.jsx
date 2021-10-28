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

  return (
    <div className="record">
      <h3>{name}</h3>
      <a
        href={`https://marketplace.axieinfinity.com/profile/${ronin}/axie`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ronin}
      </a>
      <br />
      <br />
      <p>MMR: {mmr}</p>
      <p>Rank: #{rank}</p>
      <br />
      <p>
        Total SLP: {total_slp} ~ (${(total_slp * lastPrice).toFixed(4)})
      </p>
      <p>In Game SLP: {in_game_slp}</p>
      <p>In Ronin SLP: {ronin_slp}</p>

      <br />
      <br />

      <p>
        Last Claim: {new Date(last_claim * 1000).toLocaleString()} ~ Next Claim:{" "}
        {new Date(next_claim * 1000).toLocaleString()}
      </p>

      <br />
      <p>Lifetime SLP: {lifetime_slp}</p>

      <br />
      <br />
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default Record;
