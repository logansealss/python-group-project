import downCaret from '../../../img/caret-down.svg'

export default function Collapser (props) {
  return (
    <div id='collapser'>
      <div
        id='collapse_button'
        className={props.expanded && 'expanded'}
        onClick={()=> props.setter(val => !val)}>
        <img className='tasb-caret' src={downCaret} />
      </div>
      <div className='grow'>{props.title}</div>
      <div className='collapser_rhs_icons'>
        {props.obj}
        <div><img className='tasb-caret' src={downCaret} /></div>
      </div>
      {props.expanded && props.children}
  </div>
  )
};
