import Draggable from "react-draggable";
import {useEffect, useRef, useState} from "react";

export const Chrome = (props) => {
    // layout ------------------------------------------------------------
    useEffect(() => {
        console.log('최초')
        maximumChrome();
    }, [])

    const inputRef = useRef(null);
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    const desktopHeight = document.querySelector('.desktop').clientHeight - 40;

    const [layoutStyle, setLayoutStyle] = useState({width: '500px', height: '500px', top: 0, left: 0});
    const [layoutClass, setLayoutClass] = useState('layout-chrome layout-chrome-max');
    const [layoutMax, setLayoutMax] = useState(false);

    const [previousPosition, setPreviousPosition] = useState({x: 0, y: 0});
    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});
    const [beforePosition, setBeforePosition] = useState({x: 0, y: 0});
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
            // 최대화 직전 position state 저장
            setBeforePosition({x: currentPosition.x, y: currentPosition.y});
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
        else setCurrentPosition({ x: beforePosition.x, y: beforePosition.y });
    }, [layoutMax]);

    // tab ------------------------------------------------------------
    // tab active
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabs, setTabs] = useState([1]);

    // 탭 추가
    const addTab = () => {
        let copy = [...tabs];
        copy.push(1);
        setTabs(copy);

        // activeIndex 변경
        selectTab(copy.length - 1);
    }

    // 탭 삭제
    const removeTab = (id) => {
        let copy = [...tabs];
        copy.splice(id, 1);
        setTabs(copy);

        if (tabs.length == 1) {
            closeChrome();
        }
    }
    

    useEffect(() => {
        return () => {
            // if (tabs.length == beforeTabLength) {
            //     console.log('index change')
            //     setActiveIndex(0);
            // }
        }
    }, [tabs]);

    // 탭 이동
    const selectTab = (index) => {
        setActiveIndex(index);
    }

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
                    <div className='chrome-appbar' onDoubleClick={maximumChrome}>
                        <div className='chrome-tabs'>
                            <ul>
                                {
                                    tabs.map((value, index) => {
                                        return (
                                            <li data-index={index} className={index == activeIndex ? 'list-item active' : 'list-item'} onClick={() => {selectTab(index)}} key={index}>
                                                <b className="left-curve"></b>
                                                <b className="right-curve"></b>
                                                <div className='tab-content'>
                                                    <img src='/assets/images/free-icon-chrome-888846.png' />
                                                    <a>New Tab</a>
                                                    <span className='tab-close-btn' onClick={() => {removeTab(index)}}>
                                                        <i className='fa-solid fa-xmark'></i>
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <span className='tab-plus' onClick={addTab}>
                                    <i className='fa-solid fa-plus'></i>
                                </span>
                            </ul>
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
                                <span className='icon-disabled'><i className="fa-solid fa-arrow-left"></i></span>
                                <span className='icon-disabled'><i className="fa-solid fa-arrow-right"></i></span>
                                <span><i className="fa-solid fa-rotate-right"></i></span>
                            </div>
                        </div>
                        <div className='chrome-url'>
                            <span className="material-symbols-outlined url-info">info</span>
                            <input type={'text'} onFocus={handleFocus} ref={inputRef} defaultValue={'localhost:3000/home'}/>
                        </div>
                        <div className='chrome-appbar-bottom-btn'>
                            {/*<span>icons</span>*/}
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    )
}