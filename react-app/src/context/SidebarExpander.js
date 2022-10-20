import React, {useState} from "react";

export const SidebarContext = React.createContext();

export function SidebarProvider(props) {
  const [expanded, setExpanded] = useState(true);
  return (
    <SidebarContext.Provider value={[expanded,setExpanded]}>
      {props.children}
    </SidebarContext.Provider>
  )
};
