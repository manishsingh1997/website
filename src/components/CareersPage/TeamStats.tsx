import React from 'react';

import './TeamStats.scss';

const TeamStats = () => {
  return (
    <div className="team-stats">
      <div className="team-stats__items">
        <p>
          <span className="highlight">1/3 Women </span>
          <br />
          vs 1/30 in Construction
        </p>
      </div>
      <div className="team-stats__items">
        <p>
          <span className="highlight">1/2 Women </span>Owned
        </p>
      </div>
      <div className="team-stats__items">
        <p>
          <span className="highlight">1/2 Minority </span>
          <br />
          Leadership Team
        </p>
      </div>
    </div>
  );
};

export default TeamStats;
