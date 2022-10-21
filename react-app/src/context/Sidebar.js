import React, {useState} from "react";

export const SidebarContext = React.createContext();

export function SidebarProvider(props) {
  const [expanded, setExpanded] = useState(true);
  const [listName, setListName] = useState('')
  return (
    <SidebarContext.Provider value={{expander: [expanded,setExpanded], listName: [listName, setListName]}}>
      {props.children}
    </SidebarContext.Provider>
  )
};
