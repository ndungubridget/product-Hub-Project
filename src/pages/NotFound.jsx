import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <>
      <Header title="Page not found" />
      <div className="page-body landing">
        <h1 className="landing-logo">404</h1>
        <p className="landing-desc">This shelf is empty — the page you are looking for does not exist.</p>
        <Link className="btn-primary" to="/dashboard">Back to Dashboard</Link>
      </div>
    </>
  )
}
