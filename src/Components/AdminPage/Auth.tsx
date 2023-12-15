import React from 'react'

export const Auth = ({ changeTab }: { changeTab: () => void }) => {
    const [pass, setPass] = React.useState<string>("")
    const [failed, setFailed] = React.useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(pass)
        if (pass === process.env.REACT_APP_ADMIN_PASS) {
            window.localStorage.setItem("Authenticated", "Batko ti vdmin")
            setFailed(false)
            changeTab()
        } else {
            setFailed(true)
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value)
    }
    return <div>
        <form className="auth-wrapper" onSubmit={handleSubmit}>
            <input className="auth-input" type="text" onChange={handleChange}></input>
            {failed && <p style={{ color: 'red', height: '0.2rem' }}>Wrong password</p>}
            <button className="auth-button" type='submit'>GO</button>
        </form>
    </div>
}