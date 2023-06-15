import logo from './logo.svg';
import './App.css';
import {Chrome} from "./component/Chrome";
import {useState} from "react";

function App() {
    let [desktopPrograms, setDesktopPrograms] = useState({'chrome': false})

    const openProgram = (id) => {
        let copy = {...desktopPrograms};
        copy[id] = true;
        setDesktopPrograms(copy);
    }

    return (
        <div className="App" style={{backgroundImage: "url(/assets/images/img0_1366x768.jpg)"}}>
            <div className='desktop'>
                <div className='desktop-icon' data-id={'chrome'} onDoubleClick={(event) => {
                    openProgram(event.currentTarget.dataset.id);
                }}>
                    <img src='/assets/images/free-icon-chrome-888846.png'/>
                    <p>Chrome</p>
                </div>
                <div className='desktop-icon'>
                    <img src='/assets/images/dogi.png'/>
                    <p>Dogi</p>
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

            {desktopPrograms.chrome && <Chrome desktopPrograms={desktopPrograms} setDesktopPrograms={setDesktopPrograms}/>}
        </div>
    );
}

export default App;
