import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Space, FloatButton  } from 'antd';
import Modal from 'react-modal';

import ins from '../image/ins.jpg'
import bilibili from '../image/bilibili.png'
import youtube from '../image/youtube.png'
import headerImage from '../image/testPaints.png';
import './video.scss'
import anima1 from '../V/Credit.mp4'
import thumbnail1 from '../image/amagoya1_.jpg'

const videos = [
    // replace with your own video data
    {src: anima1, thumbnail: thumbnail1, title: 'Video 1', desc: 'Description for video 1'},
    {src: anima1, thumbnail: thumbnail1, title: 'Video 2', desc: 'Description for video 2'},
    {src: anima1, thumbnail: thumbnail1, title: 'Video 2', desc: 'Description for video 2'},
    {src: anima1, thumbnail: thumbnail1, title: 'Video 2', desc: 'Description for video 2'},
    {src: anima1, thumbnail: thumbnail1, title: 'Video 2', desc: 'Description for video 2'},
    // ...
]

const Video = () => {
    // Navigation, jump to other pages
    const navigate = useNavigate()

    const [selectedVideo, setSelectedVideo] = useState(null);

    // Second useState is to store the state of the modal (open or close)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div id='all'>
            <div id='header'>
                <div id='headmenu'>
                    <div id='sns'>
                        <div id='information'>
                            <Space size={12} wrap>
                                <a href="https://www.instagram.com/pepperoni_warrior/"><Avatar src={<img src={ins} alt="ins" />} /></a>
                                <a href="https://space.bilibili.com/6749586/?spm_id_from=333.999.0.0"><Avatar src={<img src={bilibili} alt="ins" />} /></a>
                                <a href="https://www.youtube.com/@lliao8227"><Avatar src={<img src={youtube} alt="ins" />} /></a>
                            </Space>
                     </div> {/* close for id='information' */}
                    </div> {/* close for id='sns' */}
                    <div id='hmenu'>
                        <ul>
                            <a href="/"><li><p>Main Page</p></li></a>
                            <a href="/paint"><li className='leftsolid'><p>Paintings</p></li></a>
                            <a href="/video"><li className='leftsolid'><p>Video</p></li></a>
                            <a href=""><li className='leftsolid'><p>Contacts</p></li></a>
                        </ul>
                    </div>
                    <div id='hummenu'>
                        <div className='drawr'></div>
                    </div>
                </div> {/* close for id='headmenu' */}
            </div> {/* close for id='header' */}
            <div id='box'>
                <div id='content'>
                    {/*  The header images */}
                    <img className="header" src={headerImage} alt="Header" style={{width: "100%", height: "auto"}}/>
                    {/*  The videos */}
                    <div className='video-container'>
                        {videos.map((video, index) => (
                            <div className='video-thumbnail' key={index} onClick={() => {setSelectedVideo(video); setModalIsOpen(true);}}>
                                <img src={video.thumbnail} alt={video.title} />
                                <h2>{video.title}</h2>
                                <p className='video-description'>{video.desc}</p>
                            </div>
                        ))}
                    </div> {/* Close for className='video-container' */}
                    <Modal 
                        isOpen={modalIsOpen} 
                        onRequestClose={() => setModalIsOpen(false)}
                    >
                        <button onClick={() => setModalIsOpen(false)}>X</button>
                        {selectedVideo && (
                            <div>
                                <h2>{selectedVideo.title}</h2>
                                <video className='video-pop' src={selectedVideo.src} controls />
                                <p>{selectedVideo.desc}</p>
                            </div>
                        )}
                    </Modal>
                </div> {/* Close for id='content' */}
            </div> {/* Close for id='box' */}
            <div id='page'>
                <div
                style={{
                    height: '500vh', 
                    padding: 10,
                  }}>             
                <FloatButton.BackTop />
                </div>
            </div>
        </div>
    )
}

export default Video