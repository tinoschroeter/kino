
const ProfileBox = ({ user }) => {
  return (
    <div className="profile-box">
      <div className="circle">{ user.name }</div>
      <span className="arrow fa fa-angle-down"></span>
    </div>
  );
};

export default ProfileBox;
