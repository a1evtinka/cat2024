import {MessageOutlined, ToolOutlined } from '@ant-design/icons';
import globe from '../shared/icons/globe.svg'

import '../App.css'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate()

  const handleClick = (page: number) => {
    switch (page) {
      case 1: 
      navigate('/create')
      break;
      case 2: navigate('/about')
      break;
    }
  };

  return (
        <div className="page-container">
            <div className="left-container">
              <div className="squares-container">
                <div className="square-1" onClick={() => handleClick(2)}>
                  <svg 
                  xmlns='https://www.w3.org/2000/svg' 
                  xmlLang='en'
                  xmlnsXlink='https://www.w3.org/1999/xlink'
                  viewBox='0 0 500 500'>
                    <title>circular text path</title>
                    <defs>
                      <path id="textcircle" d="m250,400 
                      a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" transform="rotate (12, 250, 250)" />
                    </defs>
                    <g className="textcircle">
                      <text textLength={920}>
                        <textPath 
                          xlinkHref='#textcircle' 
                          aria-label='cowork-and-travel'
                          textLength={920}>cowork and travel | проект и команда |</textPath>
                      </text>
                    </g>
                  </svg>
                </div>
                <div className="square-2">
                  <div className='circle'>
                    <MessageOutlined />
                  </div>
                  <span>Профиль и чаты *</span>
                </div>
              </div>
              <div className="big-rectangle">
                <div className='green-text-big'>2024</div>
                <div className='green-text'>Мои поездки</div>
              </div>
            </div>
            <div className="right-container">
              <div className="thin-rectangle" onClick={() => handleClick(1)}>
               <ToolOutlined />
                <span>Создать поездку</span>
              </div>
              <div className="big-rectangle-2">
                <span className='dark-text'>Найти поездку</span>
                {/* <div className='circle-2'> */}
                  <img style={{margin: 0, width: '500px'}}src={globe} alt="mountains" />
                {/* </div> */}
              </div>
            </div>
        </div>
  )
}


