import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import icone from '../imgs/icones.png'
import banner from '../imgs/post/campnou.jpg'
import foto from '../imgs/avatar/Frenkie.jpg';
import postImage from '../imgs/post/fdj.jpg'
import grafico from '../imgs/perfil/grafico.png'
import './css/perfil.css';
import './css/index.css';


const perfis = [
    {
        id: 1,
        name: 'Frenkie De Jong',
        bio: 'Soccer | Netherlands | FC Barcelona',
        loc: 'Barcelona, Spain',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU',
        banner: 'https://cdn2.civitatis.com/espana/barcelona/visita-guiada-camp-nou.jpg',
        time: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
        timeNome: 'FC Barcelona',
        selec: 'https://upload.wikimedia.org/wikipedia/pt/a/a1/Netherlands_national_football_team_logo_2017.png',
        selecNome: 'Holanda'
    },

];

const Perfil = () => {

    return (
        <div className='container-perfil'>
            <div className='navbar'>
                <div className='navbar-column-icon'>
                    <Link to="/feed" style={{ textDecoration: 'none', color: 'inherit' }}><img src={icone} className='icon-navbar'/></Link>
                </div>
            </div>
            <div className='section-total-perfil'>
                <div className='coluna-perfil'>
                    {perfis.map((perfil) => (
                        <div className='row-perfil'>
                            <motion.div
                                initial={{ opacity: 0, y: -100 }}   // Começa invisível e acima
                                animate={{ opacity: 1, y: 0 }}     // Anima para visível e posição normal
                                transition={{ duration: 1 }} className='perfil-p'>
                                <div className='perfil-metade-banner-p'>
                                    <img className='banner-p' src={perfil.banner}></img>

                                </div>
                                <div className='perfil-metade-p'>
                                    <div className='perfil-section-foto-p'>
                                        <div className='perfil-row-center'>
                                            <img className='foto-perfil-p' src={perfil.foto}></img>
                                        </div>
                                    </div>
                                    <div className='perfil-line1-p'>
                                        <div className='perfil-coluna-p'>
                                            <h4 className='perfil-title-p'>{perfil.name}</h4>
                                            <p className='perfil-text-p'>{perfil.bio}</p>
                                            <p className='perfil-text-p loc-p'>{perfil.loc}</p>
                                        </div>
                                        <div className='perfil-coluna-assoc'>
                                            <div className='perfil-row-assoc'>
                                                <div className='perfil-cards'>
                                                    <div className='card-assoc'>
                                                        <div className='foto-time-assoc'>
                                                            <img src={perfil.time} className='time-assoc'></img>
                                                        </div>
                                                        <div className='nomeTime'>
                                                            <p className='perfil-text-p'>{perfil.timeNome}</p>
                                                        </div>
                                                    </div>
                                                    <div className='card-assoc'>
                                                        <div className='foto-time-assoc'>
                                                            <img src={perfil.selec} className='time-assoc'></img>
                                                        </div>
                                                        <div className='nomeTime'>
                                                            <p className='perfil-text-p'>{perfil.selecNome}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                    <div className='row-dados'>
                        <div className='dados'>
                            <div className='grafico-row'>
                                <img src={grafico} className='grafico'></img>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='coluna-novodados'>
                    <div className='row-novodados'>
                        <div className='coluna-novodados'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
