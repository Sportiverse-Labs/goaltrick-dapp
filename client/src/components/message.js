import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { color, AnimatePresence, motion } from 'framer-motion';
import { FaCircleChevronRight, FaCircleInfo, FaCheck } from "react-icons/fa6";
import { IoIosCall, IoMdVideocam, IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { LiaPaperclipSolid } from "react-icons/lia";
import pdf from '../imgs/chat/Contrato_Ronaldo_Barcelona.pdf';
import icone from '../imgs/icones.png'
import './css/message.css';
import './css/index.css';

const perfis = [
    {
        id: 1,
        name: 'Frenkie De Jong',
        bio: 'Soccer | Netherlands | FC Barcelona',
        loc: 'Barcelona, Spain',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU',
        banner: 'https://64.media.tumblr.com/3aee457fea15ff72783f67668003a393/tumblr_pvzyax5XQG1tljwzco2_1280.jpg'
    },
];
const initialMessages = [
    {
        id: 1,
        name: 'Olá, meu nome é Ronaldo',
        class: 'message-me',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU'
    },
    {
        id: 2,
        name: 'Olá, eu sou representante do Barcelona',
        class: 'message-re',
        image: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/messi-argentina-guatemala-e1718811255101.jpg?w=1200&h=1200&crop=1'
    },
    {
        id: 3,
        name: 'Gostaria de fechar um contrato com você',
        class: 'message-re',
        image: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/messi-argentina-guatemala-e1718811255101.jpg?w=1200&h=1200&crop=1'

    },
];
const Message = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // atualiza o valor conforme o usuário digita
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name: inputValue,
                class: 'message-me',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU', // coloque o padrão ou personalize
            },
        ]);
        setInputValue(''); // limpa o input após enviar
    };

    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        const isLoggedIn = localStorage.getItem('isLoggedIn')
            if (isLoggedIn !== 'true') {
                navigate("/");
            }
    }, [messages]);

    return (
        <div className='container-message'>
            <div className='navbar'>
                <div className='navbar-column-icon'>
                    <Link to="/feed" style={{ textDecoration: 'none', color: 'inherit' }}><img src={icone} className='icon-navbar' /></Link>
                </div>
            </div>
            <div className='section-total-message'>
                <div className='section-perfil-message'>
                    {perfis.map((perfil) => (
                        <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='perfil-message' key={perfil.id}>
                            <div className='perfil-metade-banner-message'>
                                <img className='banner-message' src={perfil.banner} />
                                <div className='perfil-section-foto-message'>
                                    <img className='foto-perfil-message ab-message' src={perfil.foto} />
                                </div>
                            </div>
                            <div className='perfil-metade-message'>
                                <div className='perfil-line1-message'>
                                    <div className='perfil-coluna-message'>
                                        <h4 className='perfil-title-message'>{perfil.name}</h4>
                                        <p className='perfil-text-message'>{perfil.bio}</p>
                                        <p className='perfil-text-message loc-message'>{perfil.loc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
                <div className='section-message'>
                    <div className='column-message'>
                        <div className='row-message'>
                            <motion.div layout
                                initial={{ opacity: 0, y: -100 }}   // Começa invisível e acima
                                animate={{ opacity: 1, y: 0 }}     // Anima para visível e posição normal
                                transition={{ duration: 1 }} className='message'>
                                <div className='message-perfil'>
                                    <div className='div-message-image'>
                                        <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img className='imageUser' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU' />
                                        </Link>
                                    </div>
                                    <div className='div-user-perfil'>
                                        <h3 className='title'>Frenkie De Jong</h3>
                                        <p className='code'>#123132</p>

                                    </div>
                                </div>
                                <div className='messages' ref={messageEndRef}>
                                    {messages.map((message, index) => {
                                        const prev = messages[index - 1];
                                        const isSameAsPrevious =
                                            prev &&
                                            prev.class === message.class &&
                                            prev.image === message.image;

                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                key={index}
                                                className={message.class}
                                                style={{ paddingTop: isSameAsPrevious ? '0' : '1vw' }} // ou 'grid', etc.
                                                ref={messageEndRef}
                                            >
                                                <img className='card-message-foto' style={{ display: isSameAsPrevious ? 'none' : 'flex' }} src={message.image} />
                                                <div className='card-message' style={{ marginLeft: isSameAsPrevious ? '0' : '1vw', marginRight: isSameAsPrevious ? '0' : '1vw' }}>
                                                    <h1 className='text'>{message.name}</h1>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <div className='section-input'>
                                    <div className='column-input'>
                                        <div className='row-input'>
                                            <div className='div-input'>
                                                <input value={inputValue}
                                                    onChange={handleInputChange} className='input-message' type="text" id="nome" name="nome" placeholder='Write something...'></input>
                                            </div>
                                            <div className='message-column-button'>
                                                <IoMdSend onClick={handleSendMessage} className='button' />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
                <div className='section-contract-message'>
                    <div className='card-contract'>
                        <div className='contract-div'>
                            <h1 className='contract-title'>Contract</h1>
                        </div>
                        <div className='contract-div'>
                            <div className='column'>
                                <a href={pdf} target="_blank" rel="noopener noreferrer">
                                    <button className="contract-button none-margin">View Contract</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Message;