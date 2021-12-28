
const ProfileBox = ({ session }) => {
  console.log(session)
  return (
    <div className="profile-box">
      <div>{ session.user.name }</div>
    </div>
  );
};

export default ProfileBox;
