import { useGetPoints } from '../../lib/learn/records';
import { TWITTER_USER_NAME } from '../../lib/constants';

const tweet = points => {
  const url = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fnextjs.org%2Flearn&text=I%20just%20got%20${points}%20points✨%20on&via=${TWITTER_USER_NAME}`;
  window.open(url, '_blank');
};

const Profile = ({ isMobile }) => {
  const points = useGetPoints();

  if (isMobile) {
    return (
      <div className="namecard f6">
        {points ? (
          <span className="points">
            <strong className="fw6">{points} points</strong>
          </span>
        ) : null}
        <style jsx>{`
          .namecard {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            margin-top: 1px;
          }
          .points {
            display: flex;
            margin-right: 0.5rem;
          }
          button {
            flex: 1;
            height: 2rem;
            line-height: 2rem;
            padding: 0 0.5rem;
            margin: 0;
            font-size: inherit;
            outline: none;
            border: none;
            background: none;
            -webkit-appearance: none;
            color: #aeaeae;
            cursor: pointer;
            transition: color 0.2s ease;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="namecard">
      <div className="profile">
        <div className="info">
          <div className="f5">
            <strong className="fw7">{points}</strong> points
          </div>
        </div>
      </div>
      <div className="buttons">
        <button type="button" className="f5" onClick={() => tweet(points)} disabled={points <= 0}>
          Tweet
        </button>
      </div>
      <style jsx>{`
        .profile {
          align-items: center;
          padding: 1rem 1rem 0;
        }
        .info {
          font-size: 20px;
          text-align: center;
        }
        .info p {
          margin: 0;
        }
        .buttons {
          display: grid;
          grid-template-columns: 1fr;
          margin: 0 0.5rem;
        }
        .buttons button {
          height: 2rem;
          padding: 0;
          margin: 0.5rem;
          outline: none;
          border: none;
          background: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .buttons button:hover {
          color: grey;
        }
        .buttons button:disabled {
          color: #aeaeae;
          cursor: auto;
        }
        .namecard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 264px;
          border-radius: 7px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Profile;
