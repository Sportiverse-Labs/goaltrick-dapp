import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { color, AnimatePresence, motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { FaCircleChevronRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import icone from '../imgs/icones.png';
import './css/feed.css';
import './css/index.css';


const perfis = [
    {
        id: 1,
        name: 'Frenkie De Jong',
        bio: 'Soccer | Netherlands | FC Barcelona',
        loc: 'Barcelona, Spain',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqnuzMk0HKVhQosaxe55zciSEN3HCXF1tO-PfNCsP2b3rkjewQqdSPsyzbF7A8QMDmBc&usqp=CAU',
        banner: 'https://64.media.tumblr.com/3aee457fea15ff72783f67668003a393/tumblr_pvzyax5XQG1tljwzco2_1280.jpg'
    }
];

const Feed = () => {
    const [imagemModal, setImagemModal] = useState(null);
    const [iconModal, setIconModal] = useState(null);
    const [authorModal, setAuthorModal] = useState(null);
    const [locModal, setLocModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const navigate = useNavigate();

    const abrirImagem = (src, icon, author, loc, content, postId) => {
        setImagemModal(src);
        setIconModal(icon);
        setAuthorModal(author);
        setLocModal(loc);
        setContentModal(content);
    
        fetch('http://localhost:5000/api/list-post-comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: postId.toString() })
        })
        .then(response => response.json())
        .then(data => {
            const comments = data["Comment"].map((comment, index) => ({
                id: index,
                postId: parseInt(comment.postId),
                author: "Messi",
                content: comment.body,
            }));
            setComments(comments);
        })
        .catch(error => {
            console.error("Error fetching comments:", error);
        });
    };
    

    const fecharImagem = () => {
        setImagemModal(null);
        setIconModal(null);
        setAuthorModal(null);
        setLocModal(null);
    };

      const [posts, setPosts] = useState([]);
      const [comments, setComments] = useState([]);
      const [comment, setComment] = useState('');

      const handleSend = () => {
        if (comment.trim()) {
          createComment(comment);
          setComment('');
        }
      };
    
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
      };

      useEffect(() => {

            const isLoggedIn = localStorage.getItem('isLoggedIn')
              if (isLoggedIn !== 'true') {
                navigate("/");
            }

          fetch('http://localhost:5000/api/list-posts')
              .then(response => response.json())
              .then(data => {
                  const postList = data["All posts"]["Post"].map((post, index) => ({
                      id: index,
                      author: perfis[0].name,
                      loc: "Barcelona, Spain",
                      content: post.title,
                      foto: perfis[0].foto,
                      date: new Date(post.timestamp).toLocaleDateString(),
                      image: post.body,
                      perfil: '',
                  }));
                  setPosts(postList);
              })
              .catch(error => {
                  console.error("Error searching posts:", error);
              });


              fetch('http://localhost:5000/api/list-post-comments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId: "0" })
              })
                .then(response => response.json())
                .then(data => {
                    const comments = data["Comment"].map((comment, index) => ({
                    id: index,
                    postId: parseInt(comment.postId),
                    author: "Messi",
                    content: comment.body,
                    }));
                    setComments(comments);
                })
                .catch(error => {
                    console.error("Error fetching comments:", error);
                });


      }, []);

      function createPost(title) {
        fetch('http://localhost:5000/api/create-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accountName: "alice",
            title: title
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Post created:', data);
            window.location.reload(); 
          })
          .catch(error => {
            console.error('Error creating post:', error);
          });
      };      

      function createComment(body, postId) {
        fetch('http://localhost:5000/api/create-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accountName: "alice",
            body: body,
            postId: "0"
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Comment created:', data);
            window.location.reload(); 
          })
          .catch(error => {
            console.error('Error creating comment:', error);
          });
      };      


      function createLike(postId) {
        fetch('http://localhost:5000/api/create-like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountName: 'alice',
            postId: postId
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Like created:', data);
          })
          .catch(error => {
            console.error('Error creating like:', error);
          });
      }

      function listPostLikes(postId) {
        return fetch('http://localhost:5000/api/list-post-likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: postId
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Likes list:', data);
            return data;
          })
          .catch(error => {
            console.error('Error listing likes:', error);
          });
      }

      function deleteLike(postId) {
        fetch('http://localhost:5000/api/delete-like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountName: 'alice',
            postId: postId
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Like deleted:', data);
          })
          .catch(error => {
            console.error('Error deleting like:', error);
          });
      }      
      

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


    return (
        <div className='container-feed'>
            <AnimatePresence>
                {authorModal && iconModal && (
                    <motion.div
                        i initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }} className="modal-imagem" >
                        <div className='post'>
                            {imagemModal ? (
                                <div className='post-section-image'>
                                    <img className='post-image' src={imagemModal} alt="Tela cheia" />
                                </div>
                            ) : (
                                <div></div>
                            )}
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
                                                    <img src={"https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/messi-argentina-guatemala-e1718811255101.jpg?w=1200&h=1200&crop=1"} className='comment-image'></img>
                                                </div>
                                                <div className='comment-content'>
                                                    <h3 className='title'>{comment.author}</h3>
                                                    <h5 className='text'>{comment.content}</h5>
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
                                            <input className='input' type="text" id="nome" name="nome" placeholder='Make a comment' value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={handleKeyDown}></input>
                                        </div>
                                    </div>
                                    <div className='post-send' >
                                        <motion.div className='div-send' initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ scale: 1.05 }} // Azul mais escuro no hover
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={handleSend}>
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
                        <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='div-image-ask'>
                                <img src={perfis[0].foto} className='foto'></img>
                            </div>
                        </Link>
                        <div className='div-ask2'>
                            <div className='container-input-feed'>
                                <input className='input-feed' type="text" id="nome" name="nome" placeholder='Write something...'  onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                const title = e.target.value;
                                createPost(title);
                                }
                            }}></input>
                            </div>
                        </div>
                    </div>
                    <div className='section-cards'>
                        {posts.slice().reverse().map((post) => (
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
                                    <img className='image-card' src={post.image}></img>
                                </div>
                                <div className='section-like'>
                                    <div className='like-column'>
                                        <button
                                            onClick={toggleLike} className='like'>
                                            {liked ? <FaHeart color="red" className='like-icon' /> : <FaRegHeart color="white" className='like-icon' />}
                                        </button>
                                    </div>
                                    <div className='like-column'>
                                        <button className='like' onClick={() => abrirImagem(post.image, post.foto, post.author, post.loc, post.content, post.id)}>
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
                        <h3 className='trending-title'>Chats</h3>
                        <Link to="/message" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='topico'>
                                <a><h4 className='trending-topics'>Barcelona</h4></a>
                                <p className='trending-text'>2 messages</p>
                            </div>
                        </Link>
                    </div>
                    <div className='card-trending'>
                        <h3 className='trending-title'>Transfers</h3>
                        <Link to="/market" style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default Feed;