function ManageUsersPage({
  currentUserId,
  managedUsers,
  newUserEmail,
  setNewUserEmail,
  newUserPassword,
  setNewUserPassword,
  manageError,
  manageMessage,
  onCreateVolunteer,
  onChangeUserRole,
  onDeleteUser,
  onBack,
}) {
  return (
    <section className="gg-manage-wrap">
      <div className="gg-manage-card">
        <div className="gg-manage-head">
          <div>
            <p className="gg-landing-kicker">Admin Panel</p>
            <h2 className="gg-login-title">Manage Volunteer & Admin Accounts</h2>
          </div>
          <button
            type="button"
            className="gg-btn gg-btn-secondary"
            onClick={onBack}
          >
            Back to Map
          </button>
        </div>

        <form className="gg-manage-form" onSubmit={onCreateVolunteer}>
          <div>
            <label className="gg-login-label" htmlFor="new-user-email">Volunteer Email</label>
            <input
              id="new-user-email"
              type="email"
              className="gg-login-input"
              placeholder="volunteer@example.com"
              value={newUserEmail}
              onChange={(event) => setNewUserEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="gg-login-label" htmlFor="new-user-password">Temporary Password</label>
            <input
              id="new-user-password"
              type="text"
              className="gg-login-input"
              placeholder="At least 6 characters"
              value={newUserPassword}
              onChange={(event) => setNewUserPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="gg-btn gg-btn-primary">Add Volunteer</button>
        </form>

        {manageError && <p className="gg-login-error">{manageError}</p>}
        {manageMessage && <p className="gg-manage-success">{manageMessage}</p>}

        <div className="gg-users-list">
          {managedUsers.length === 0 ? (
            <p className="gg-login-subtitle">No volunteer/admin accounts created yet.</p>
          ) : (
            managedUsers.map((user) => (
              <article key={user.id} className="gg-user-row">
                <div>
                  <p className="gg-user-email">{user.email}</p>
                  <p className="gg-user-role">{user.role === 'admin' ? 'Admin' : 'Volunteer'}</p>
                </div>

                <div className="gg-user-actions">
                  {user.role === 'volunteer' ? (
                    <button
                      type="button"
                      className="gg-btn gg-btn-primary"
                      onClick={() => onChangeUserRole(user.id, 'admin')}
                    >
                      Promote to Admin
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="gg-btn gg-btn-secondary"
                      onClick={() => onChangeUserRole(user.id, 'volunteer')}
                    >
                      Set as Volunteer
                    </button>
                  )}

                  <button
                    type="button"
                    className="gg-btn gg-btn-danger"
                    disabled={currentUserId === user.id}
                    onClick={() => onDeleteUser(user.id)}
                  >
                    {currentUserId === user.id ? 'Current User' : 'Remove'}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ManageUsersPage;
