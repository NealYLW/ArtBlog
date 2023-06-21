import './paint.scss'
import {useNavigate} from 'react-router-dom'
import { Avatar, Space, FloatButton  } from 'antd';


import ins from '../image/ins.jpg'
import bilibili from '../image/bilibili.png'
import youtube from '../image/youtube.png'

const Paint = () => {
    const navigate = useNavigate()

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
                            <a href=""><li className='leftsolid'><p>Video</p></li></a>
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
                    <div menuillustlink></div>
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
        </div>
    )
}
export default Paint