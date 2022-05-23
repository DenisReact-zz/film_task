import React, { FC } from "react";
import s from "../styles/Filter.module.css";

interface PropsFilter {
  onChangeFilter: (str: string) => void;
}
const Filter: FC<PropsFilter> = ({ onChangeFilter }) => {
  const thumb = React.useRef(null);

  const click_button = (filter: string, index: number) => () => {
    onChangeFilter(filter);
    thumb.current.style.left = `${50 * index}%`;
  };
  return (
    <div className={s.filter} data-testid="filters">
      <div className={s.blocks}>
        <button
          onClick={click_button("descending", 0)}
          data-testid="buttonOfFilter"
        >
          Descending
        </button>
        <button
          onClick={click_button("ascending", 1)}
          data-testid="buttonOfFilter"
        >
          Ascending
        </button>
        <div className={s.thumb} ref={thumb}></div>
      </div>
    </div>
  );
};

export default Filter;
