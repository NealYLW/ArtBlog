import './video.scss'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { Avatar, Space, FloatButton  } from 'antd';
import Modal from 'react-modal'

import ins from '../image/ins.jpg'
import bilibili from '../image/bilibili.png'
import youtube from '../image/youtube.png'

// Import your images here
import headerImage from '../image/testPaints.png';
import painting1 from '../image/Screen.png'
import painting2 from '../image/Screen.png'
import painting3 from '../image/Screen.png'

// Add more paintings as needed
const paintings = [
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting1, desc: 'Description for painting 1...........................................'},
    {src: painting2, desc: 'Description for painting 2...........................................'},
    {src: painting3, desc: 'Description for painting 3...........................................'},
    // ...
]

const Paint = () => {
    // Navigation, jump to other pages
    const navigate = useNavigate()

    // Pagination
    const paintingsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Pop up window to show the details of the painting
    // First useState is to store the painting that is selected
    const [selectedPainting, setSelectedPainting] = useState(null);
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
                        </div>
                    </div>
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
                </div>
            </div>
            <div id='box'>
                <div id='content'>
                {/*  The header images */}
                <img className="header" src={headerImage} alt="Header" style={{width: "100%", height: "auto"}}/>

                {/*  The paintings */}
                <div className="content-container">
                    {/* slice each page so that it only show 'paintingsPerPage' Arts. */}
                    {paintings.slice((currentPage - 1) * paintingsPerPage, currentPage * paintingsPerPage).map((painting, index) => (
                        <div className="painting-container" key={index}>
                            <img 
                                src={painting.src} 
                                alt={`Painting ${index + 1}`} 
                                style={{width: "100%", height: "auto"}}
                                /* Open and close Modal */
                                onClick={ ()=>{
                                    setSelectedPainting(painting);
                                    setModalIsOpen(true);}
                                }
                            />
                            <p className="description">{painting.desc}</p>
                        </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo(0, 0);
                        }}
                        disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button 
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo(0, 0);
                        }}
                    disabled={currentPage * paintingsPerPage >= paintings.length}>
                        Next
                    </button>
                    <div id='contentbox'></div>
                    <div id='anime'></div>
                    <div id='navbox'></div>
                </div>
            </div>
            <div id='page'>
                <div
                style={{
                    height: '500vh', 
                    padding: 10,
                  }}>             
                <FloatButton.BackTop />
                </div>
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
            >
                <button onClick={() => setModalIsOpen(false)}>X</button>
                {selectedPainting && (
                    <img 
                        src={selectedPainting.src} 
                        alt="Selected painting" 
                        style={{width: "100%", height: "auto"}}
                    />
    )}
</Modal>
        </div>
    )
}
export default Paint
