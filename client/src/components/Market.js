import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import icone from '../imgs/icones.png'
import './css/market.css';
import './css/index.css';
import flecha from '../imgs/market/flecha.png';
import { useNavigate } from 'react-router-dom';

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

const transfers = [
    {
        id: 1,
        name: 'Frenkie De Jong',
        bio: 'Soccer | Midfield ',
        bid: '3.24',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU',
        team1: 'https://upload.wikimedia.org/wikipedia/pt/b/b8/AFC_Ajax_Amsterdam.svg', 
        team2: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png'
    },
    {
        id: 1,
        name: 'Lionel Messi',
        bio: 'Soccer | Forward',
        bid: '10.24',
        foto: 'https://www.directvsports.com/__export/1744250446573/sites/dsports/img/2025/04/09/byawwrr9.png_1135970241.png',
        team1: 'https://a.espncdn.com/i/teamlogos/soccer/500/20232.png', 
        team2: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/Logo_PSG.png'
    },
    
];

const Market = () => {
    const [imagemModal, setImagemModal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
            const isLoggedIn = localStorage.getItem('isLoggedIn')
            if (isLoggedIn !== 'true') {
                navigate("/");
            }
          }, []);

    const abrirImagem = (src) => {
        setImagemModal(src);
    };

    const fecharImagem = () => {
        setImagemModal(null);
    };
    return (
        <div className='container-market'>
            <div className='navbar'>
                <div className='navbar-column-icon'>
                    <Link to="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={icone} className='icon-navbar' />
                    </Link>
                </div>
            </div>
            <div className='section-total-market'>
                <div className='section-perfil-market'>
                    {perfis.map((perfil) => (
                        <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='perfil-market' key={perfil.id}>
                            <div className='perfil-metade-banner-market'>
                                <img className='banner-market' src={perfil.banner} />
                                <div className='perfil-section-foto-market'>
                                    <img className='foto-perfil-market ab-market' src={perfil.foto} />
                                </div>
                            </div>
                            <div className='perfil-metade-market'>
                                <div className='perfil-line1-market'>
                                    <div className='perfil-coluna-market'>
                                        <h4 className='perfil-title-market'>{perfil.name}</h4>
                                        <p className='perfil-text-market'>{perfil.bio}</p>
                                        <p className='perfil-text-market loc-market'>{perfil.loc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
                <div className='section-market'>
                    <div className='column-card-market'>
                        {transfers.map((transfer) => (
                        <motion.div layout
                                initial={{ opacity: 0, y: -100 }}   // Começa invisível e acima
                                animate={{ opacity: 1, y: 0 }}     // Anima para visível e posição normal
                                transition={{ duration: 1 }} className='row-card-market'>
                            <div className='card-market'>
                                <div className='player-column column-imagem-jogador'>
                                    <div className='player-row'>
                                        <img className='imagem-jogador' src={transfer.foto}></img>
                                    </div>
                                </div>
                                <div className='player-column column-texto-jogador'>
                                    <div className='row-info-texto-jogador margin-text'>
                                        <h2 className='nome-jogador'>{transfer.name}</h2>
                                    </div>
                                    <div className='row-info-texto-jogador'>
                                        <p className='function-jogador'>{transfer.bio}</p>
                                    </div>
                                    <div className='transfer-row'>
                                        <div className='transfer-time-column'>
                                            <div className='row'>
                                                <img className='imagem-time' src={transfer.team2}></img>
                                            </div>
                                        </div>
                                        <div className='transfer-seta-column'>
                                            <div className='row'>
                                                <img className='seta' src={flecha}></img>
                                            </div>
                                        </div>
                                        <div className='transfer-time-column'>
                                            <div className='row'>
                                                <img className='imagem-time' src={transfer.team1}></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='player-column column-value-jogador'>
                                    <div className='row-info-texto-jogador margin-text'>
                                        <h2 className='bid-title'>Bid Value:</h2>
                                    </div>
                                    <div className='row-info-texto-jogador'>
                                        <p className='bid-value'>{transfer.bid}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        ))};
                    </div>
                </div>
                <div className='section-tops-market'>
                    <div className='card-trending'>
                                            <h3 className='trending-title'>Chats</h3>
                                            <Link to="/message" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className='topico'>
                                                    <a><h4 className='trending-topics'>Barcelona</h4></a>
                                                    <p className='trending-text'>2 messages</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='card-trending'>
                                            <h3 className='trending-title'>Feed</h3>
                                            <Link to="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className='topico'>
                                                    <a><h4 className='trending-topics'>Newests</h4></a>
                                                </div>
                                            </Link>
                                        </div>
                </div>
            </div>
        </div>

    );
};

export default Market;