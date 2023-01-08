import './side-menu.scss'
import redirect from "../../utilities/redirect.js";
import ListItem from "../lists/list-item/List-item.js";
import {useRef} from "react";
import {useTheme} from "../../ThemeContext.js";

export default function SideMenu(props) {

    const theModal = useRef();
    const [theme] = useTheme();

    function handleClick (e) {
        if( !theModal.current.contains(e.target) ){
            props.setMenuShow(false);
        }
    }
    return( props.menuShow
            ? <><div className='blinder' onClick={ handleClick }></div>
                    <div className='menu'
                         ref={theModal}
                         style={{
                             background:`${theme.surface}`,
                             color: `${theme.onSurface}`
                        }}
                    >
                        <div id='title'> { props.title || '' } </div>
                        <div id='items-container'>
                            { typeof props.sideMenuItems !== 'undefined'
                                ? props.sideMenuItems.map((x,index)=>(

                                    <ListItem
                                        key={index}
                                        headline={x.title}
                                        effects={true}
                                        click={()=>redirect(x.url)}
                                    />

                                ))
                                : ''
                            }
                            <ListItem headline={ 'Sign out' }
                                      effects={true}
                            />

                        </div>
                    </div>
                </>
            : ''
    )
}