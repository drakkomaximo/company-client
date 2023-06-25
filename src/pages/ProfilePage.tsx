import { Link } from "react-router-dom";
import { profileOptions } from "../utils";
import { OptionBox } from "../components";

const ProfilePage = () => {
  return (
    <div className="flex justify-evenly items-center w-full h-full">
      {profileOptions.map((option) => (
        <Link to={option.route} key={option.id}>
          <OptionBox label={option.label} />
        </Link>
      ))}
    </div>
  );
};

export default ProfilePage;
