import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import icone from '../imgs/icones.png'
import { Keplr } from '@keplr-wallet/types';
import { useNavigate } from 'react-router-dom';
import { SecretNetworkClient } from "secretjs";
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

        console.log("Hash:", hashHex);

        const body = {
            creator: accounts[0].address,
            hashAccount: hashHex
        };

        try {
            const response = await fetch("http://[2804:214:82c1:2271:1f79:bca5:305d:a479]:1317/sportiverse.sportiverse.Msg/CreateAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();
            console.log("API:", result);
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