const login = () => {
  return (
    <>
      <div className="panda">
        <div className="ear"></div>
        <div className="face">
          <div className="eye-shade"></div>
          <div className="eye-white">
            <div className="eye-ball"></div>
          </div>
          <div className="eye-shade rgt"></div>
          <div className="eye-white rgt">
            <div className="eye-ball"></div>
          </div>
          <div className="nose"></div>
          <div className="mouth"></div>
        </div>
        <div className="body"> </div>
        <div className="foot">
          <div className="finger"></div>
        </div>
        <div className="foot rgt">
          <div className="finger"></div>
        </div>
      </div>
      <form>
        <div className="hand"></div>
        <div className="hand rgt"></div>
        <h1>Panda Login</h1>
        <div className="form-group">
          <input required="required" className="form-control" />
          <label className="form-label">Username </label>
        </div>
        <div className="form-group">
          <input
            id="password"
            type="password"
            required="required"
            className="form-control"
          />
          <label className="form-label">Password</label>
          <p className="alert">Invalid Credentials..!!</p>
          <button className="btn">Login </button>
        </div>
      </form>
    </>
  );
};

export default login;
