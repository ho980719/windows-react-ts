import Draggable from "react-draggable";
import {useEffect, useRef, useState} from "react";

export const Chrome = (props) => {
    const desktopHeight = document.querySelector('.desktop').clientHeight - 40;

    const [layoutStyle, setLayoutStyle] = useState({width: '500px', height: '500px', top: 0, left: 0});
    const [layoutClass, setLayoutClass] = useState('layout-chrome');
    const [layoutMax, setLayoutMax] = useState(false);

    const [previousPosition, setPreviousPosition] = useState({x: 0, y: 0});
    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});
    // 창 최소화
    const minimumChrome = () => {
        let layout = document.querySelector('.layout-chrome');
        layout.style.display = 'none';
    }

    // 창 최대화
    const maximumChrome = () => {
        let layout = document.querySelector('.layout-chrome');
        if (layout.classList.contains('layout-chrome-max')) {
            layout.classList.remove('layout-chrome-max');
            setLayoutStyle({width: '500px', height: '500px', x: previousPosition.x, y: previousPosition.y})
            setLayoutClass('layout-chrome');
            setLayoutMax(false);
        } else {
            layout.classList.add('layout-chrome-max');
            setLayoutStyle({width: '100%', height: `${desktopHeight}px`, top: 0, left: 0})
            setLayoutClass('layout-chrome layout-chrome-max')
            setLayoutMax(true);
        }
    };

    // 창 닫기
    const closeChrome = () => {
        let copy = {...props.desktopPrograms};
        copy.chrome = false;
        props.setDesktopPrograms(copy);
    }

    // 창 드래그
    const handleDrag = (e, {x, y}) => {
        setPreviousPosition({...currentPosition});
        setCurrentPosition({x, y});
    };
    const dragRef = useRef();
    const initializePosition = () => {
        setCurrentPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        if (layoutMax) initializePosition();
    }, [layoutMax]);

    return (
        <>
            {/*<Draggable handle='.chrome-appbar' cancel='.chrome-appbar-btn'>*/}
            <Draggable
                handle=".chrome-appbar"
                cancel=".chrome-appbar-btn"
                position={currentPosition}
                onStart={() => setPreviousPosition({...currentPosition})}
                onDrag={handleDrag}
                onStop={() => setCurrentPosition({...currentPosition})}
                nodeRef={dragRef}
            >
                <div className={layoutClass} style={layoutStyle} ref={dragRef}>
                    {/*<div className='chrome-tabs'>
                    <div className='chrome-tab-item'>
                        <span>icon</span>
                        <p>React App</p>
                    </div>
                </div>*/}
                    <div className='chrome-appbar' onDoubleClick={maximumChrome}>
                        <div className='chrome-appbar-tab'>

                        </div>
                        <div className='chrome-appbar-btn'>
                            <span onClick={minimumChrome}><i className="fa-solid fa-minus"></i></span>
                            <span onClick={maximumChrome}><i className="fa-regular fa-window-maximize"></i></span>
                            <span onClick={closeChrome}><i className="fa-solid fa-xmark"></i></span>
                        </div>
                    </div>
                    <div className='chrome-appbar-bottom'>
                        <div className='chrome-navigate'>
                            <div className='chrome-navigate-btn'>
                                <span><i className="fa-solid fa-arrow-left"></i></span>
                                <span className='icon-disabled'><i className="fa-solid fa-arrow-right"></i></span>
                                <span><i className="fa-solid fa-rotate-right"></i></span>
                            </div>
                        </div>
                        <div className='chrome-url'>
                            <span className="material-symbols-outlined url-info">info</span>
                            <input type={'text'} defaultValue={'localhost:3000/home'}/>
                        </div>
                        <div className='chrome-appbar-bottom-btn'>
                            <span>icons</span>
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    )
}