import downCaret from '../../../img/caret-down.svg'

export default function BannerItem (props) {
  return (
    <>
    <div className='grow'>{props.children}</div>
      <div className='collapser_rhs_icons'>
        {props.obj}
        <div>
          <img className='tasb-caret' src={downCaret} />
        </div>
    </div>
    </>
  )
}
