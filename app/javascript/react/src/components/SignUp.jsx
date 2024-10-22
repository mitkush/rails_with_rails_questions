import React, { useState } from 'react';

const SignUp = () => {
  const [formField, setFormField] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    termsAgreed: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormField((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log(formField);
    createQuestion(formField);
  };

  const createQuestion = (data) => {
    fetch(`/api/v1/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "failure") {
          // Handle failure (e.g., show error messages)
        } else {
          // Handle success (e.g., redirect or show success message)
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              <form onSubmit={handleSignUpSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formField.name}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formField.email}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formField.password}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Repeat your password</label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    value={formField.passwordConfirmation}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    name="termsAgreed"
                    checked={formField.termsAgreed}
                    onChange={handleInputChange}
                    id="form2Example3cg"
                  />
                  <label className="form-check-label">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                    Register
                  </button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">
                  Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={`${window.location.origin}/assets/sZmfyrWuzHTfzLdwJuj1ALQcBtbKAtbA.jpg`} alt="Description" className="img-fluid" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
