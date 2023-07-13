import './index.scss'
import {useNavigate} from 'react-router-dom'
import { Avatar, Space } from 'antd';
import Paint from '../Paints/paint';
import Video from '../Video/video';
import amagoya1_ from '../image/amagoya1_.jpg'
import light from '../image/a_light.jpg'
import ins from '../image/ins.jpg'
import bilibili from '../image/bilibili.png'
import youtube from '../image/youtube.png'
const Layout = () => {
    const navigate = useNavigate()
    const goPics = () =>{
        navigate('/paint')
        navigate('/video')
    }

    return(
        <div className="topBand">
            <div id="header">
                <div id="headen">
                    <div id="headmenu">
                        <div id='Lan'> Need a picture</div>
                        <div id='information'>
                        <Space size={12} wrap>
                            <a href="https://www.instagram.com/pepperoni_warrior/"><Avatar src={<img src={ins} alt="ins" />} /></a>
                            <a href="https://space.bilibili.com/6749586/?spm_id_from=333.999.0.0"><Avatar src={<img src={bilibili} alt="ins" />} /></a>
                            <a href="https://www.youtube.com/@lliao8227"><Avatar src={<img src={youtube} alt="ins" />} /></a>
                        
                        </Space>
                        </div>
                    
                    </div>
                </div>
            </div>
            <div id="home">
            <div id="navi">
                <ul>
                    <li><a href="/Paint" >
                        <img id = "image0" src= {amagoya1_} onMouseOver = {e => (e.currentTarget.src = light)} 
                        onMouseOut = {e => (e.currentTarget.src = amagoya1_)}
                        onClick = {goPics}/>
                        </a>
                    </li>
                    <li>
                        <a href="/Video">
                        <img id = "image1" src= {amagoya1_} width='100%' height='auto'/>
                        </a>
                    </li>
                    <li>
                        <a href="">
                        <img id = "image2" src= {amagoya1_} onMouseOver = {e => (e.currentTarget.src = light)} 
                        onMouseOut = {e => (e.currentTarget.src = amagoya1_)}/>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="">
                        <img id = "image3" src= {amagoya1_} width='100%' height='auto'/>
                        </a>
                    </li>
                    <li>
                        <a href="">
                        <img id = "image4" src= {amagoya1_} width='100%' height='auto'/>
                        </a>
                    </li>
                    <li>
                        <a href="">
                        <img id = "image5" src= {amagoya1_} onMouseOver = {e => (e.currentTarget.src = light)} 
                        onMouseOut = {e => (e.currentTarget.src = amagoya1_)}/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Layout