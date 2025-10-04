import { type ReactElement, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../services/auth'

const LoginPage = (): ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) return setError('Email and password are required')
    setLoading(true)
    // TODO: Wire to API
    setTimeout(() => {
      setLoading(false)
      // fake success: store a token
      auth.setToken('fake-admin-token')
      navigate('/')
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Admin Sign in</h2>
          <p className="text-sm text-gray-500">Sign in to manage civic reports</p>
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

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-footer">
            <div>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            </div>
            <div>
              <Link to="/register" className="text-sm text-primary-600">Create account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
