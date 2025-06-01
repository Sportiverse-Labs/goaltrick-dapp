import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import icone from '../imgs/icones.png'
import { useNavigate } from 'react-router-dom';
import './css/register.css';
import './css/index.css';

const Register = () => {
    const [address, setAddress] = useState('');
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

        const handleRegister = async () => {
            console.log("Email:", email);
            console.log("Password:", password);
        
            const data = `${email}:${password}`; 
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
            try {
                // Get account count before creation
                const accountsBefore = await fetch("http://localhost:5000/api/list-accounts");
                const dataBefore = await accountsBefore.json();
                const totalBefore = dataBefore["All accounts"].pagination.total;
        
                // Create account
                const createResponse = await fetch("http://localhost:5000/api/create-account", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        AccountName: "alice",
                        hashAccount: hashHex
                    })
                });
        
                await createResponse.json();
        
                const accountsAfter = await fetch("http://localhost:5000/api/list-accounts");
                const dataAfter = await accountsAfter.json();
                const totalAfter = dataAfter["All accounts"].pagination.total;
        
                if (totalAfter > totalBefore) {
                    alert("Account successfully created!");
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate("/feed");
                } else {
                    alert("Account creation failed.");
                }
        
            } catch (error) {
                console.error("Error during registration:", error);
            }
        };
             

    return (
        <div className='container'>
            <motion.div
                initial={{ opacity: 0, y: -100 }}   // Começa invisível e acima
                animate={{ opacity: 1, y: 0 }}     // Anima para visível e posição normal
                transition={{ duration: 1 }}     // Duração do efeito
            ><div className='imagem-reg'></div>
            </motion.div>
            <div className='register column center'>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}   // Começa invisível e acima
                    animate={{ opacity: 1, y: 0 }}     // Anima para visível e posição normal
                    transition={{ duration: 1.5 }}     // Duração do efeito
                    className='container-reg column'
                >
                    <div className='titulo-reg'>
                        <h2 className='titulo-register inter white'>Create your <span className='blue'>account</span></h2>
                    </div>
                    <div className='container-input-reg2 row center'>
                        <div className='column'>
                            <h5 className='input-text inter'>Full name:</h5>
                            <input className='input-reg' type="text" id="nome" name="nome"></input>
                        </div>
                    </div>
                    <div className='container-input-reg2 row center'>
                        <div className='column'>
                            <h5 className='input-text inter'>Email:</h5>
                            <input className='input-reg' type="text" id="email" name="email"></input>
                        </div>
                    </div>
                    <div className='container-input-reg2 row center'>
                        <div className='column'>
                            <h5 className='input-text inter'>Password:</h5>
                            <input className='input-reg' type="text" id="password" name="password"></input>
                        </div>
                    </div>
                    <div className='container-input-reg2 row center'>
                        <div className='column'>
                            <h5 className='input-text inter'>Confirm password:</h5>
                            <input className='input-reg' type="text" id="c-password" name="c-password"></input>
                        </div>
                    </div>
                    <div className='container-input-reg column center'>
                        <button onClick={connectKeplr} className='botaoSport'>
                            <img src={icone} className='iconeBotao'></img>
                        </button>
                        <button onClick={handleRegister} className='botaoEntrar inter'>Create</button>
                        <Link to="/"><h4 className='input-text e inter'>Already have an Account?</h4></Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
