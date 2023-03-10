import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import SideMenu from "../../side-menu/Side-menu.js";
import './top-nav-bar.scss';
import {ReactComponent as DotsIcon} from "../../../scss/icons/threeDots.svg";
import {ReactComponent as HomeIcon} from "../../../scss/icons/home.svg";
import {ReactComponent as BackIcon} from "../../../scss/icons/back.svg";
import {capitalizeFirstChar} from "../../../utilities/utilities.js";
import {useTheme} from "../../../ThemeContext.js";
import {useNavigate} from "react-router-dom";

export default function TopNavBar(props) {
    const isHome = useRef((location.hash.slice(2).includes('home')))
    const [ menuShow,setMenuShow ]= useState(false);
    const main= useRef();
    const navigate = useNavigate();
    const [ theme ]= useTheme();
    const scrollElement= document.querySelector("html");
    const [ style,setStyle ]= useState('medium');

    const headers={
        small:{
            backgroundColor: theme.surface,
            color: theme.onSurface,

        },
        medium:{
            backgroundColor: (!isHome.current)  ? `${theme.surface}` : '',
            color:(isHome.current) ? theme.onPrimary : theme.onSurface,

        }
    }

    const headerStyle = {...props.style,...headers[style]}
    const onscroll = useCallback((e)=>{
        let scrollNumber=scrollElement.scrollTop;

        if( scrollNumber >0 ){
            main.current.classList.add('small');
            main.current.classList.remove('medium');
            setStyle('small')
        }else{
            main.current.classList.remove('small');
            main.current.classList.add('medium');
            setStyle('medium')
        }

    },[scrollElement])

    useEffect(()=>{
        document.addEventListener("scroll", onscroll);
        return ()=>{
            document.removeEventListener('scroll', onscroll)
        }

    },[])

    return (<>
        <div ref={ main }
             className='header medium'
             style={ headerStyle }
        >
            <div className='left-icons'>
                <span id='backIcon'
                      onClick={()=>navigate(-1)}
                >
                    <BackIcon />
                </span>
            </div>
            <div className='right-icons'>
                { !isHome.current
                    ? <span id='homeIcon'
                        onClick={ ()=>navigate('/home')}>
                        <HomeIcon/>
                    </span>
                    : ''
                }
                <span onClick={ ()=>setMenuShow(!menuShow)}
                      id='dotsIcon'
                ><DotsIcon/>
                </span>
            </div>
            <div className='title'>
                <div className='overline'>
                    { props.overline || '' }
                </div>
                <div className='headline'>
                    { props.headline ? capitalizeFirstChar(props.headline) : '' }
                </div>
            </div>
        </div>

        <SideMenu menuShow={ menuShow }
                  setMenuShow={ setMenuShow }
                  sideMenuItems={ props.sideMenuItems }
        />
    </>)
}