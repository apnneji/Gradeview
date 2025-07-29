import React, { useState } from 'react';
import logo from '../assets/sto_logo.png'; // Import the logo

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        const isWEb = false;
        let response = "";

        try {
            console.log(username, password);
        
            if(!isWEb){
                const URLLocal = `http://localhost:5001/api/user/GetUserLogin?username=${username}`;
                response = await fetch(URLLocal,);            
            }
            else
            {
                //const headers = new Headers();
                //headers.set("Authorization", "Basic " + btoa(`${uname}:${pword}`));
                //console.log(headerss.values)
                
                const uname = "11253820";
                const pword = "60-dayfreetrial";
                response = await fetch(`http://apnneji-001-site1.ktempurl.com/api/User/GetUserLogin?username=${username}`
                    ,{
                    method: "GET", // or POST, PUT, etc.
                    headers: {
                        'Authorization': 'Basic ' + btoa(`${uname}:${pword}`),
                        'Content-Type': 'application/json'
                    },
                }
                );
            }

            if (response.ok) {
                const data = await response.json();
                const userData = Array.isArray(data) ? data[0] : data;
                if (userData && userData.pword === password) {
                    onLogin(username);
                } else {
                    setError('Invalid username or password');
                }
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later. ' + err.message);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f0f2f5',
        },
        loginForm: {
            padding: '40px',
            backgroundColor: '#ffc107', // Yellow
            borderRadius: '10px',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: '300px',
        },
        logo: {
            width: '100px', // Adjust size as needed
            marginBottom: '20px',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxSizing: 'border-box',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff', // Blue
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        orangeButton: {
            backgroundColor: '#fd7e14', // Orange
        },
        yellowButton: {
            backgroundColor: '#ffc107', // Yellow
        },
        passwordContainer: {
            position: 'relative',
            width: '100%',
            margin: '10px 0',
        },
        passwordInput: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxSizing: 'border-box',
        },
        eyeIcon: {
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
            margin: '10px 0',
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.loginForm}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <h2 style={{ color: '#007bff' }}>Login</h2>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.passwordContainer}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.passwordInput}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login; 