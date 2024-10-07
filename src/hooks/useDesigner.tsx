"use client";
import { DesignerContext } from '@/context/DesignerContext';
import React, { useContext } from 'react'

const useDesigner = () => {

    const context = useContext(DesignerContext);

    if(!context) {
        throw new Error("useDesigner must used inside designerContext!")
    }

    return context;
}

export default useDesigner;
