import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import steveShop from '../../img/hp_steve_3.png';
import spBubble from '../../img/spBubble.png'
import milkCarton from '../../img/milkCarton.png'
import './splash.css';


export default function Splash() {
    let user = useSelector((state) => state.session.user);

    return (
        <>
            <div className='main-body'>
                <div className='splash-upper'>
                    The smart to-do app for busy people.
                </div>
                <div className='mid-btn-div'>
                    <Link className='main-su-btn-link-wrap' to="/signup">
                        <button className='main-body-sign-up-btn'> Sign Up Free</button>
                    </Link>
                </div>
                <div className='spl-lower-main'>
                    <img alt='' className='spl-steve-img-1' src={steveShop} />
                    <div className='spl-lower-title-text'>Get things done, together.</div>
                    <p className='spl-lower-p'>
                        Share your lists and give tasks to
                        {' '}others to get things done faster.</p>
                </div>
                <div className='spl-bottom-padding-div'></div>
            </div>
            <div className='spl-bot-info-main'>
                <div className='spl-bot-info-graphic-div'>
                    <img alt='' className='spl-bot-milk-carton' src={milkCarton} />
                    <div className='spl-bot-mc-div'>
                        <img alt='' className='spl-bot-sp-bubble' src={spBubble} />
                        <div className='spl-bot-mc-sp-text'>
                            Code!
                        </div>
                    </div>
                </div>
                <div className='spl-bot-info-panel-rt'>
                    <div className='spl-info-contributor-div'>
                        <div className='spl-bot-info-name-div'>John Carrera</div>
                        <div className='spl-bot-info-icon-div'>
                            <a
                                href='https://www.linkedin.com/in/john-carrera-778b53231/'
                                className='spl-bot-cont-link'
                            >
                                Linkedin
                            </a>

                            <a
                                href='https://github.com/JohnCarrera'
                                className='spl-bot-cont-link'
                            >
                                GitHub
                            </a>
                            <a
                                href='https://www.john-carrera.com'
                                className='spl-bot-cont-link'
                            >
                                Website
                            </a>
                            <a
                                href='https://www.john-carrera.com/tech/portfolio'
                                className='spl-bot-cont-link'
                            >
                                Portfolio
                            </a>
                        </div>
                    </div>
                    <div className='spl-info-contributor-div'>
                        <div className='spl-bot-info-name-div'>Jack Fisher</div>
                        <div className='spl-bot-info-icon-div'>
                            <a
                                href='https://www.linkedin.com/in/jackson-fisher-8631a7a1/'
                                className='spl-bot-cont-link'
                            >
                                Linkedin
                            </a>

                            <a
                                href='https://github.com/fisjac'
                                className='spl-bot-cont-link'
                            >
                                GitHub
                            </a>
                            <a
                                href='https://www.jackfisher.com'
                                className='spl-bot-cont-link'
                            >
                                Website
                            </a>
                            <a
                                href='https://www.jackfisher.com/portfolio'
                                className='spl-bot-cont-link'
                            >
                                Portfolio
                            </a>
                        </div>
                    </div>
                    <div className='spl-info-contributor-div'>
                        <div className='spl-bot-info-name-div'>Logan Seals</div>
                        <div className='spl-bot-info-icon-div'>
                            <a
                                href='https://www.linkedin.com/in/logan-seals-b91454251/'
                                className='spl-bot-cont-link'
                            >
                                Linkedin
                            </a>

                            <a
                                href='https://github.com/logansealss'
                                className='spl-bot-cont-link'
                            >
                                GitHub
                            </a>
                            <a
                                href='https://www.logan-seals.com'
                                className='spl-bot-cont-link'
                            >
                                Website
                            </a>
                            <a
                                href='https://www.logan-seals.com/portfolio'
                                className='spl-bot-cont-link'
                            >
                                Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
