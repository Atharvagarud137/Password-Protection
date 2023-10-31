import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CryptoJS from 'crypto-js';
import '../styles.css';

const generateStrongPassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const passwordLength = 12;
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; ++i) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
    }
    return generatedPassword;
};

const encryptPassword = (password) => {
    const passwordString = String(password);
    const secretKey = 'your-secret-key'; // Replace with a secure secret key
    const ciphertext = CryptoJS.AES.encrypt(passwordString, secretKey).toString();
    return ciphertext;
};

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Implement your login logic here
        // For example, check the entered username and password against your database or authentication system
        // For simplicity, assume verification is successful
        setMessage('User identity verified. Password strength is sufficient.');
    };

    const handleGeneratePassword = () => {
        const generatedPassword = generateStrongPassword();
        const encryptedPassword = encryptPassword(generatedPassword);
        setPassword(generatedPassword);
        setMessage('Generated a strong password. Please remember or save it securely.');
        console.log('Encrypted Password:', encryptedPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const openTableView = () => {
        const tableWindow = window.open('', '_blank');
        if (tableWindow) {
            const tableContent = `
                <table border="1">
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Hash value</th>
                    </tr>
                    <tr>
                        <td>${username}</td>
                        <td><span class="password-toggle" onclick="toggleVisibility('password')">${String(password)}</span></td>
                        <td><span class="hash-toggle" onclick="toggleVisibility('hash')">${encryptPassword(password)}</span></td>
                    </tr>
                </table>
                <script>
                    function toggleVisibility(column) {
                        const elements = document.getElementsByClassName(column + '-toggle');
                        for (let i = 0; i < elements.length; i++) {
                            if (elements[i].style.visibility === 'hidden') {
                                elements[i].style.visibility = 'visible';
                            } else {
                                elements[i].style.visibility = 'hidden';
                            }
                        }
                    }
                </script>
            `;
            tableWindow.document.body.innerHTML = tableContent;
        } else {
            alert('Please allow pop-ups for this site to view the table.');
        }
    };

    return (
        <div className="login-form">
            <div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                    <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                ) : (
                    <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
                )}
            </div>
            <div>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGeneratePassword}>Generate Strong Password</button>
            <button onClick={openTableView}>View Table</button>
            <p className="message">{message}</p>
        </div>
    );
};

export default LoginForm;
