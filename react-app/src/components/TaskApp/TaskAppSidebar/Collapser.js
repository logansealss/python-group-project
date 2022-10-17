import BannerItem from './BannerItem'

import downCaret from '../../../img/caret-down.svg'


export default function Collapser (props) {
  return (
    <>
    <div id='collapser'>
      <div
        id='collapse_button'
        className={props.expanded && 'expanded'}
        onClick={()=> props.setter(val => !val)}>
        <img className='tasb-caret' src={downCaret} />
      </div>
      {props.title}
  </div>
  <div className='children_container'>
    {props.expanded && props.children}
  </div>
  </>
  )
};
