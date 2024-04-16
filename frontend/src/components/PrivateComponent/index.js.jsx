import useIsAllowed from '../../hooks/useIsAllowed.js'

const PrivateComponent = ({ allowedRoles, component, children }) => {
    const allowed = useIsAllowed(allowedRoles)
    if (!allowed) return
    return component ? component : children
}

export default PrivateComponent
