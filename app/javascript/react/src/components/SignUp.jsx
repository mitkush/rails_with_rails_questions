import React, { useState } from 'react';
import ServerSideError from './ServerSideError';
import { useNavigate } from "react-router-dom";
import LogIn from './LogIn'


const SignUp = () => {
  const [isServerSideError, setIsServerSideError] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const [formField, setFormField] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [passwordMatchingError, setPasswordMatchingError] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const handleInputChange = () => {
    const { name, value, type, checked } = event.target;
    setFormField({...formField, [name]: value });
  };

  const handleSignUpSubmit = () => {
    event.preventDefault();
    createSignUp(formField);
  };

  const handlePasswordMatching = (event) => {
    const { name, value } = event.target;

    if (formField.password !== value) {
        setPasswordMatchingError("Passwords do not match");
        setIsPasswordMatched(false)
    } else {
        setPasswordMatchingError("");
        setIsPasswordMatched(true)
    }
  };

  const createSignUp = (data) => {
    fetch(`/api/v1/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({account: data}),
    })
    .then((response) => {
      const status = response.status
      return response.json().then((data) => ({ status, data }))
    })
    .then(({ status, data }) => {
      if (status === 422) {
        setIsServerSideError(true);
        setServerErrors(data.errors);
      } else {
        localStorage.setItem('account', JSON.stringify(data.account));
        localStorage.setItem('token', data.token);
        setIsServerSideError(false);
        setServerErrors([]);
        navigate(`/questions`)
      }
    })
    .catch((error) => {
    })
  };

  return (
    <>
      <div className="container-fluid p-0" style={{ height: '100%', padding: '0%', margin: '0%' }}>
        <div className="row no-gutters">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="card" style={{ height: 'auto' }}>
              <div className="card-body">
                <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                <form onSubmit={handleSignUpSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formField.name}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                    <p className="text-danger">{serverErrors.name}</p>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formField.email}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                    <p className="text-danger">{serverErrors.email}</p>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formField.password}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                    <p className="text-danger">{serverErrors.password}</p>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Repeat your password</label>
                    <input
                      type="password"
                      name="passwordConfirmation"
                      value={formField.passwordConfirmation}
                      onChange={handlePasswordMatching}
                      className="form-control form-control-lg"
                    />
                    <p className="text-danger">{passwordMatchingError}</p>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success btn-block btn-lg" disabled={!isPasswordMatched}>
                      Register
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    Have already an account? <u className="fw-bold text-body" onClick={() => navigate(`/LogIn`)}>Login here</u>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={`${window.location.origin}/assets/sZmfyrWuzHTfzLdwJuj1ALQcBtbKAtbA.jpg`}
              alt="Description"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
