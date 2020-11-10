import React from 'react'

const Icon = ({css, type, onClick }) => (
    <i id={`${css}`} className={`Icon fa fa-${type} ${type}`} onClick={onClick} />
)

Icon.defaultProps = {
    onClick: null
}

export default Icon