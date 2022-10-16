import React from 'react'
import logo from '../../../img/TM-logo-short-nobg.png'
import './taskAppSidebar.css'

function Collapser (props) {
  return (
    <div id='collapser'>
      {props.children}
  </div>
  )
};

export default function TaskAppSidebar () {

const items = {
  'All Tasks': <Count count={3}/>,
  'Lists': <Plus/>,
  'Tags': <Plus/>
};

// Dyanmic assignment of state variables and setters for collapse buttons
// Object.keys(items).forEach(itemName => {
  // [items[itemName]['toggle'], items[itemName]['setter']] = useState(false)
// })

return  (
  <div id='LHS_banner'>
  {Object.keys(items).map(itemName=> (
    <Collapser>
      <div
        id='collapse_button'
        ><i className="fa-solid fa-play"></i></div>
      <div className='grow'>{itemName}</div>
      <div className='flex'>
        {items[itemName]}
        <div><i className="fa-solid fa-play"></i></div>
      </div>
    </Collapser>
    ))}
  </div>
  )
};


function Plus () {
  return (<div><i className="fa-solid fa-plus"></i></div>)
};

function Count (props) {
  return (<div>{props.count}</div>)
};
