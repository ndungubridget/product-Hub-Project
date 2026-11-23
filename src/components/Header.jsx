/** Page header bar matching the mock-up: title left, admin role right. */
export default function Header({ title }) {
  return (
    <header className="page-header">
      <h2 className="page-title">{title}</h2>
      <div className="admin-block">
        <span className="admin-name">Store Administrator</span>
        <span className="admin-role">Super admin</span>
      </div>
    </header>
  )
}
