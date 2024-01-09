import React from 'react'
import './modal.css'

export const Modal = ({ component, open = true, onClose }: { component: JSX.Element, open: boolean, onClose: () => void }) => {
    const ref = React.useRef(null)
    const [isOpen, setIsOpen] = React.useState<boolean>(open)

    const body = document.body

    body.style.overflow = 'hidden'

    const handleClose = (e: React.MouseEvent) => {
        if (ref.current && e.target == ref.current) {
            setIsOpen(false)
            onClose()
            body.style.overflow = 'auto'
        }
    }

    return isOpen ? <div ref={ref} onClick={(e) => handleClose(e)} className="modal-wrapper">{component}</div> : null
}