import React from 'react'
import s from '../styles/Filter.module.css'

const Filter = (props) => {
    const thumb = React.useRef(null);

    const click_button = (filter:string, index: number) => () => {
        props.onChangeFilter(filter);
        thumb.current.style.left = `${50 * index}%`
    }
    return (
        <div className={s.filter}>
            <div className={s.blocks}>
                <button onClick={click_button("descending", 0)}>Descending</button>
                <button onClick={click_button("ascending", 1)}>Ascending</button>
                <div className={s.thumb} ref={thumb}></div>
            </div>
        </div>
    )
}

export default Filter
