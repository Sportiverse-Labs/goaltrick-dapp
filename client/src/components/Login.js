import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import icone from '../imgs/icones.png'
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import './css/index.css';

const Login = () => {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const chainId = 'cosmoshub-4'; 

    const connectKeplr = async () => {
        if (!window.keplr) {
            alert("Keplr extension not found!");
            return;
        }

        try {
            await window.keplr.enable(chainId);
            const offlineSigner = window.getOfflineSigner(chainId);
            const accounts = await offlineSigner.getAccounts();
            setAddress(accounts[0].address);
            console.log("Connected Keplr address:", accounts[0].address);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/feed');
        } catch (err) {
            console.error("Failed to connect to Keplr:", err);
        }
    };

    useEffect(() => {
    const checkWallet = async () => {
      if (window.keplr) {
        try {
          await window.keplr.enable(chainId);
          const offlineSigner = window.getOfflineSigner(chainId);
          const accounts = await offlineSigner.getAccounts();

          if (accounts.length > 0) {
            setAddress(accounts[0].address);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/feed');
          }
        } catch (err) {
          console.log("Wallet not found");
        }
      }
    };

    checkWallet();
    }, []);

    const handleLogin = async () => {
        console.log("Email:", email);
        console.log("Password:", password);

        const data = `${email}:${password}`; 

        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);

        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        try {
            const response = await fetch("http://localhost:5000/api/list-accounts", {
            method: "GET"
        });

            const result = await response.json();
            const accounts = result.accounts;
            const exists = Array.isArray(accounts) && accounts.some(account => account.hash === hashHex);

            if (exists) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate("/feed");
            } else {
                alert("This account does not exist");
            }

        } catch (error) {
            console.error("Error sending to API:", error);
        }
    };

return (
        <div className='container'>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className='imagem'></div>
            </motion.div>
            <div className='login column center'>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className='container-log column'
                >
                    <div className='container-titulo'>
                        <h1 className='titulo-login inter white'>Login</h1>
                    </div>
                    <div className='container-input row center'>
                        <div className='column'>
                            <h5 className='input-text inter'>Email:</h5>
                            <input
                                className='input'
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='container-input row center'>
                        <div className='column'>
                            <h5 className='input-text inter'>Password:</h5>
                            <input
                                className='input'
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='container-input2 column center'>
                        <button onClick={handleLogin} className='botaoEntrar inter'>Enter</button>
                        <button onClick={connectKeplr} className='botaoSport'>
                            <img src={icone} className='iconeBotao' alt="Keplr" />
                        </button>
                        <Link to="/register"><h4 className='input-text e inter'>Create your account</h4></Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;