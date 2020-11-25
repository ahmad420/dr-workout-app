import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Form.css';
const SignUp = () => {
  const [state, setState] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    errors: {
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let errors = state.errors;
    switch (name) {
      case 'name':
        errors.name = value.length < 5 ? 'Name is too short' : '';
        break;
      case 'password':
        errors.password = value.length < 8 ? 'Password is too short' : '';
        break;
      case 'confirmPassword':
        console.log(state);
        errors.confirmPassword =
          state.password !== value ? 'Passwords do not match' : '';
        break;
      default:
    }

    setState({ ...state, errors, [name]: value });
  };

  const saveOnLocalStorage = (name, password) => {
    window.localStorage.setItem(name, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErrors(state.errors)) {
      console.log('Valid form');
      saveOnLocalStorage(state.name, state.password);
      setValid(true);
    } else {
      console.log('Invalid form');
    }
  };

  const validateErrors = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (error) => error.length > 0 && (valid = false)
    );
    return valid;
  };

  const { errors } = state;

  const render = () => {
    if (valid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
                autoComplete="off"
              />

              {errors.name.length > 0 && (
                <span className="error">{errors.name}</span>
              )}
            </div>
            <div className="password">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />

              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="password">
              <input
                type="password"
                name="confirmPassword"
                placeholder="password"
                onChange={handleChange}
              />

              {errors.confirmPassword.length > 0 && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
            <div className="info">
              <small>Password must be eight characters in length.</small>
            </div>
            <div className="submit">
              <button>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return <div>{render()}</div>;
};

export default SignUp;
