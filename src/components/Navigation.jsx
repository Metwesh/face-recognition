import Brain from "./Brain.png";
import ProfileIcon from "./ProfileIcon";

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  return (
    <nav className="flex justify-between items-center">
      <div className="ma4 br4 dim bg-white">
        <img
          style={{ width: "auto", height: "4.6rem" }}
          className="br4 shadow-2"
          title="Face-recognition"
          src={Brain}
          alt="Face-recognition-logo"
        />
      </div>
      {isSignedIn && (
        <ProfileIcon toggleModal={toggleModal} onRouteChange={onRouteChange} />
      )}
    </nav>
  );
};

export default Navigation;
