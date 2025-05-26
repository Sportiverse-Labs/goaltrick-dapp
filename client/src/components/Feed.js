import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { color, AnimatePresence, motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { FaCircleChevronRight } from "react-icons/fa6";
import icone from '../imgs/icones.png'
import banner from '../imgs/post/campnou.jpg'
import foto from '../imgs/avatar/Frenkie.jpg';
import postImage from '../imgs/post/fdj.jpg'
import './css/feed.css';
import './css/index.css';
import { VscWand } from 'react-icons/vsc';


const perfis = [
    {
        id: 1,
        name: 'Frenkie De Jong',
        bio: 'Soccer | Netherlands | FC Barcelona',
        loc: 'Barcelona, Spain',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU',
        banner: 'https://64.media.tumblr.com/3aee457fea15ff72783f67668003a393/tumblr_pvzyax5XQG1tljwzco2_1280.jpg'
    },
    {
        id: 2,
        name: 'Lionel Messi',
        bio: 'Soccer | Argentina | Inter Miami',
        loc: 'Miami, EUA',
        foto: 'https://static.poder360.com.br/2021/08/messi-contrato-barcelona.jpg',
        banner: 'https://pbs.twimg.com/media/E4q_IIoXIAQQtWh.jpg:large'
    },
    {
        id: 2,
        name: 'Lionel Messi',
        bio: 'Soccer | Argentina | Inter Miami',
        loc: 'Miami, EUA',
        foto: 'https://static.poder360.com.br/2021/08/messi-contrato-barcelona.jpg',
        banner: 'https://pbs.twimg.com/media/E4q_IIoXIAQQtWh.jpg:large'
    },
    {
        id: 2,
        name: 'Lionel Messi',
        bio: 'Soccer | Argentina | Inter Miami',
        loc: 'Miami, EUA',
        foto: 'https://static.poder360.com.br/2021/08/messi-contrato-barcelona.jpg',
        banner: 'https://pbs.twimg.com/media/E4q_IIoXIAQQtWh.jpg:large'
    },
];

const posts = [
    {
        id: 1,
        author: 'Frenkie De Jong',
        bio: perfis[0].bio,
        loc: perfis[0].loc,
        foto: perfis[0].foto,
        content: 'Derrota mais amarga da minha carreira! Dei meu máximo, mas não foi dessa vez culés. Agradeço pelo apoio e temos outra final no próximo Domingo. Visca Barça sempre!',
        date: '08/05/2025',
        image: 'https://pbs.twimg.com/media/GqXi87xW8AAdCHj.jpg',
        perfil: '',

    },
    {
        id: 2,
        author: 'Maria Souza',
        loc: 'São Paulo, Brazil',
        content: 'Aula de CSS foi incrível!',
        foto: 'https://images.immediate.co.uk/production/volatile/sites/3/2023/08/2023.06.28-06.20-boundingintocomics-649c79f009cdf-Cropped-8d74232.png',
        date: '07/05/2025',
        image: '',
        perfil: '',
    },
    {
        id: 3,
        author: 'Carlos Lima',
        loc: 'Paris, França',
        content: 'Como funciona o useEffect?',
        foto:'https://pm1.aminoapps.com/6757/b195be45a8386544d387dd8f235b5c93e8e8e02bv2_hq.jpg',
        date: '06/05/2025',
        image: 'https://th.bing.com/th/id/OIP.F3o0929lAUfE5sy1SSQceQHaEK?rs=1&pid=ImgDetMain',
        perfil: '',
    }
]

const comments = [
    {
        id: 1,
        author: perfis[2].name,
        text: 'Lenda do futebol!',
        time: '1 week ago',
        likes: 200,
        foto: perfis[2].foto
    },
    {
        id: 2,
        author: perfis[1].name,
        text: 'Fraco',
        time: 'Today',
        likes: 87,
        foto: perfis[1].foto
    },
    {
        id: 2,
        author: perfis[1].name,
        text: 'Fraco',
        time: 'Today',
        likes: 87,
        foto: perfis[1].foto
    },
    {
        id: 2,
        author: perfis[1].name,
        text: 'Fraco',
        time: 'Today',
        likes: 87,
        foto: perfis[1].foto
    },
    {
        id: 2,
        author: perfis[1].name,
        text: 'Fraco',
        time: 'Today',
        likes: 87,
        foto: perfis[1].foto
    },
    {
        id: 2,
        author: perfis[1].name,
        text: 'Fraco',
        time: 'Today',
        likes: 87,
        foto: perfis[1].foto
    },
    {
        id: 2,
        author: perfis[1].name,
        text: 'Fraco',
        time: 'Today',
        likes: 87,
        foto: perfis[1].foto
    },
]
const Feed = () => {
    const [imagemModal, setImagemModal] = useState(null);
    const [iconModal, setIconModal] = useState(null);
    const [authorModal, setAuthorModal] = useState(null);
    const [locModal, setLocModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    const abrirImagem = (src, icon, author, loc, content) => {
        setImagemModal(src);
        setIconModal(icon);
        setAuthorModal(author);
        setLocModal(loc);
        setContentModal(content);
    };

    const fecharImagem = () => {
        setImagemModal(null);
        setIconModal(null);
        setAuthorModal(null);
        setLocModal(null);
    };


    /*Like*/

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const toggleLike = () => {
        if (liked) {
            setLikesCount(likesCount - 1);
        } else {
            setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
    };

    const [likedComment, setLikedComment] = useState(false);
    const [likesCountComment, setLikesCountComment] = useState(0);

    const toggleLikeComment = () => {
        if (likedComment) {
            setLikesCountComment(likesCountComment - 1);
        } else {
            setLikesCountComment(likesCountComment + 1);
        }
        setLikedComment(!likedComment);
    };


    return (
        <div className='container-feed'>
            <AnimatePresence>
                {imagemModal && iconModal && (
                    <motion.div
                        i initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }} className="modal-imagem" >
                        <div className='post'>
                            <div className='post-section-image'>
                                <img className='post-image' src={imagemModal} alt="Tela cheia" />
                            </div>
                            <div className='post-column'>
                                <div className='post-topo'>
                                    <div className='post-topo-column-foto'>
                                        <div className='row'>
                                            <img className='comment-post-foto' src={iconModal}></img>
                                        </div>
                                    </div>
                                    <div className='post-author'>
                                        <h3 className='post-title'>{authorModal}</h3>
                                        <h3 className='post-title-comment'>Comments</h3>
                                        <p className='post-loc'>{locModal}</p>
                                    </div>
                                    <button className='button-post' onClick={fecharImagem}>X</button>
                                </div>
                                <div className='post-comments'>
                                    {comments.map((comment) => (
                                        <div className='row center'>
                                            <div className='comment'>
                                                <div className='comment-icone'>
                                                    <img src={comment.foto} className='comment-image'></img>
                                                </div>
                                                <div className='comment-content'>
                                                    <h3 className='title'>{comment.author}</h3>
                                                    <p className='text'>{comment.text}</p>
                                                    <div className='comment-content-likes'>
                                                        <div className='comment-count-column'>
                                                            <p className='comment-count'>{comment.likes + likesCountComment} likes</p>
                                                        </div>
                                                        <div className='comment-count-column'>
                                                            <p className='comment-count'>{comment.time}</p>
                                                        </div>
                                                        <div className='comment-count-column'>
                                                            <p className='comment-count'>Awnser</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='comment-like'>
                                                    <button
                                                        onClick={toggleLikeComment} className='likeButtonComment'>
                                                        {likedComment ? <FaHeart color="red" className='like-iconButton' /> : <FaRegHeart size={32} color="white" className='like-iconButton' />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='post-section-like'>
                                    <div className='post-like-option'>
                                        <button
                                            onClick={toggleLike} className='like'>
                                            {liked ? <FaHeart color="red" className='like-icon' /> : <FaRegHeart size={32} color="white" className='like-icon' />}
                                        </button>
                                    </div>
                                    <div className='post-newComment'>
                                        <div className='div-input'>
                                            <input className='input' type="text" id="nome" name="nome" placeholder='Make a comment'></input>
                                        </div>
                                    </div>
                                    <div className='post-send' >
                                        <motion.div className='div-send' initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ scale: 1.05 }} // Azul mais escuro no hover
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.3 }}>
                                            <FaCircleChevronRight className='send' />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
            <div className='navbar'>
                <div className='navbar-column-icon'>
                    <img src={icone} className='icon-navbar'></img>
                </div>
            </div>
            <div className='section-total'>
                <div className='section-perfil'>
                    {perfis.map((perfil) => (
                        <Link to="/market" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <motion.div className='perfil' initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)" }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}>
                                <div className='perfil-metade-banner'>
                                    <img className='banner' src={perfil.banner}></img>
                                    <div className='perfil-section-foto '>
                                        <img className='foto-perfil ab' src={perfil.foto}></img>
                                    </div>
                                </div>
                                <div className='perfil-metade'>
                                    <div className='perfil-line1'>
                                        <div className='perfil-coluna'>
                                            <h4 className='perfil-title'>{perfil.name}</h4>
                                            <p className='perfil-text'>{perfil.bio}</p>
                                            <p className='perfil-text loc'>{perfil.loc}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
                <div className='section-feed'>
                    <div className='ask'>
                        <div className='div-image-ask'>
                            <img src={foto} className='foto'></img>
                        </div>
                        <div className='div-ask2'>
                            <div className='container-input-feed'>
                                <input className='input-feed' type="text" id="nome" name="nome" placeholder='Write something...'></input>
                            </div>
                        </div>
                    </div>
                    <div className='section-cards'>
                        {posts.map((post) => (
                            <motion.div layout
                                initial={{ opacity: 0, y: -100 }}   // Começa invisível e acima
                                animate={{ opacity: 1, y: 0 }}     // Anima para visível e posição normal
                                transition={{ duration: 1 }}     // Duração do efeito
                                className="card-feed" key={post.id} >
                                <div className='author'>
                                    <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}><div className='area-perfil'>
                                        <div className='author-column'>
                                            <img src={post.foto} className='foto'></img>
                                        </div>
                                        <div className='author-column'>
                                            <h3 className='card-title'>{post.author}</h3>
                                            <p className='card-loc'>{post.loc}</p>
                                        </div>
                                    </div></Link>
                                </div>
                                <div className='section-text'>
                                    <p className='card-text'>{post.content}</p>
                                </div>
                                <div className='div-imageCard' >
                                    <img className='image-card' src={post.image} onClick={() => abrirImagem(post.image, post.foto, post.author, post.loc, post.content)} ></img>
                                </div>
                                <div className='section-like'>
                                    <div className='like-column'>
                                        <button
                                            onClick={toggleLike} className='like'>
                                            {liked ? <FaHeart color="red" className='like-icon' /> : <FaRegHeart color="white" className='like-icon' />}
                                        </button>
                                    </div>
                                    <div className='like-column'>
                                        <button className='like' onClick={() => abrirImagem(post.image, post.foto, post.author, post.loc, post.content)}>
                                            <FaRegComment color='white' className='comment-icon' />
                                        </button>
                                    </div>
                                    <div className='section-date'>
                                        <div className='date-column'>
                                            <small className='card-date'>{post.date}</small>
                                        </div>
                                    </div>
                                    

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className='section-tops'>
                    <div className='card-trending'>
                        <h3 className='trending-title'>Trending Topics</h3>
                        <Link to="/message" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='topico'>
                                <a><h4 className='trending-topics'>Tópico 1</h4></a>
                                <p className='trending-text'>2050 readers</p>
                            </div>
                        </Link>
                        <div className='topico'>
                            <a><h4 className='trending-topics'>Tópico 1</h4></a>
                            <p className='trending-text'>2050 readers</p>
                        </div>
                        <div className='topico'>
                            <a><h4 className='trending-topics'>Tópico 1</h4></a>
                            <p className='trending-text'>2050 readers</p>
                        </div>
                        <div className='topico'>
                            <a><h4 className='trending-topics'>Tópico 1</h4></a>
                            <p className='trending-text'>2050 readers</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;
