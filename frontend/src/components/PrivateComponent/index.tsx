import useIsAllowed from '../../hooks/useIsAllowed'
import React from 'react'

export interface PrivateComponentProps {
    allowedRoles: string[]
    component?: React.ReactNode
    children?: React.ReactNode
}

const PrivateComponent = ({
    allowedRoles,
    component,
    children,
}: PrivateComponentProps): React.ReactNode => {
    const allowed: boolean = useIsAllowed(allowedRoles)
    if (!allowed) return
    return component ? component : children
}

export default PrivateComponent
