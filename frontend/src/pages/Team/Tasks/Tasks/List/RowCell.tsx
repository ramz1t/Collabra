import React from 'react'

const RowCell = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center min-h-14">{children}</div>
}

export default RowCell
