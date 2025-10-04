import { type ReactElement, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = (): ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) return setError('Email and password are required')
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    // TODO: Wire to API
    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an account</h2>
          <p className="text-sm text-gray-500">Register an admin user</p>
        </div>

        <form onSubmit={submit}>
          <div>
            <label className="text-sm">Email</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="text-sm">Password</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="text-sm">Confirm Password</label>
            <input className="input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-footer">
            <div>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            </div>
            <div>
              <Link to="/login" className="text-sm text-primary-600">Have an account?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
