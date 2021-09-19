import { useState } from 'react';
import styles from './SignUpForm.module.css';

export default function SignUpForm({ quote, onSignUpSubmit }) {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ firstNameErr, setFirstNameErr ] = useState(false);
    const [ lastNameErr, setLastNameErr ] = useState(false);
    const [ emailErr, setEmailErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState(false);
    const [ submitDisabled, setSubmitDisabled ] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignUpSubmit({
            firstName,
            lastName,
            email,
            password,
        });
    };

    const handleFirstNameChange = (e) => {
        setSubmitDisabled(false);

        setFirstName(e.target.value);
        if (e.target.value.length === 0 || e.target.value.length > 20) {
            setFirstNameErr(true);
        } else {
            setFirstNameErr(false);
        }
    }

    const handleLastNameChange = (e) => {
        setSubmitDisabled(false);

        setLastName(e.target.value);
        setLastNameErr(e.target.value.length === 0 || e.target.value.length > 20);
    }

    const handleEmailChange = (e) => {
        setSubmitDisabled(false);

        setEmail(e.target.value);
        setEmailErr(e.target.value.includes("hotmail") || !e.target.value.includes("@"));
    }

    const handlePasswordChange = (e) => {
        setSubmitDisabled(false);
        
        setPassword(e.target.value);
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
        setPasswordErr(!re.test(e.target.value));
    }

    return (
        <div className={`card ${styles.formcard}`}>
            <div className="row"> 
                <blockquote>{quote}</blockquote>
                <div className="col-sm-12">
                    <form onSubmit={handleSubmit}>
                        <input className="form-control form-control-lg" 
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder='First name'
                        />
                        { firstNameErr && <span className="error">First name is invalid</span>}


                        <input className="form-control form-control-lg signup-input" 
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder='Last name'
                        />
                         { lastNameErr && <span className="error">Last name is invalid</span>}

                         <input className="form-control form-control-lg signup-input" 
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder='Email'
                        />
                          { emailErr && <span className="error">Email is invalid</span>}

                          <input className="form-control form-control-lg signup-input" 
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='Password'
                        />
                          { passwordErr && <span className="error">Password must have 8 characters and alphanumeric</span>}

                        <input 
                            type="submit" 
                            className="btn btn-primary" 
                            value="Sign up"
                            disabled={submitDisabled || firstNameErr || lastNameErr || emailErr || passwordErr}
                            />
                    </form>


                </div>
            </div>
        </div>
    );
}