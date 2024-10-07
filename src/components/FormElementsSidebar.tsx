import React from 'react'
import SidebarBtnElement from './SidebarBtnElement';
import { FormElements } from './FormElements';

const FormElementsSidebar = () => {
  return (
    <div>
        FormElementsSidebar
        <SidebarBtnElement formElement={FormElements.TextFields}/>
    </div>
  )
}

export default FormElementsSidebar;
