import logo from './logo.svg';
import './App.css';
import './Reset.css';

function App() {
    return (
        <div className="App" style={{backgroundImage: "url(/assets/images/img0_1366x768.jpg)"}}>
            <div className='layout-chrome'>
                <div className='chrome-appbar'>
                    <div className='chrome-appbar-tab'></div>
                    <div className='chrome-appbar-btn'>
                        <span><i className="fa-solid fa-minus"></i></span>
                        <span><i className="fa-regular fa-window-maximize"></i></span>
                        <span><i className="fa-solid fa-xmark"></i></span>
                    </div>
                </div>
            </div>
            <div className='desktop'>
                <div className='desktop-icon'>
                    <img src='/assets/images/free-icon-chrome-888846.png' />
                    <p>Chrome</p>
                </div>
                <div className='desktop-icon'>
                    <img src='/assets/images/free-icon-chrome-888846.png' />
                    <p>Chrome</p>
                </div>
            </div>
            <div className='footer-bar'>
                <div className='footer-bar-icon-box'>
                    <div className='footer-bar-icon'>
                        <span className="material-symbols-outlined">desktop_windows</span>
                    </div>
                    <div className='footer-bar-search'>
                        <div className='footer-bar-icon'>
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input type='text' placeholder={'찾기'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
