import { useEffect, useState } from 'react';
import AccessDeniedPage from './components/AccessDeniedPage';
import DashboardPage from './components/DashboardPage';
import GuidePage from './components/GuidePage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ManageUsersPage from './components/ManageUsersPage';
import useRoleAuth from './hooks/useRoleAuth';

function App() {
  const {
    currentUser,
    error,
    managedUsers,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    manageMessage,
    manageError,
    handleLogin,
    clearAuthError,
    clearManageFeedback,
    handleLogout,
    handleCreateVolunteer,
    changeUserRole,
    deleteUser,
  } = useRoleAuth();

  const [view, setView] = useState('landing');

  useEffect(() => {
    if (currentUser && view === 'landing') {
      setView('dashboard');
    }
  }, [currentUser, view]);

  if (view === 'dashboard') {
    return (
      <DashboardPage
        currentUser={currentUser}
        onLogout={() => {
          handleLogout();
          setView('landing');
        }}
        onManageUsers={() => {
          clearManageFeedback();
          setView('manageUsers');
        }}
      />
    );
  }

  if (view === 'manageUsers') {
    return (
      <main className="gg-landing-root">
        <div className="gg-landing-bg" role="img" aria-label="Geo-Guardian landing background" />
        <div className="gg-landing-vignette" />

        {!['master_admin', 'admin'].includes(currentUser?.role) ? (
          <AccessDeniedPage onBack={() => setView('dashboard')} />
        ) : (
          <ManageUsersPage
            currentUserId={currentUser?.id}
            managedUsers={managedUsers}
            newUserEmail={newUserEmail}
            setNewUserEmail={setNewUserEmail}
            newUserPassword={newUserPassword}
            setNewUserPassword={setNewUserPassword}
            manageError={manageError}
            manageMessage={manageMessage}
            onCreateVolunteer={handleCreateVolunteer}
            onChangeUserRole={changeUserRole}
            onDeleteUser={deleteUser}
            onBack={() => setView('dashboard')}
          />
        )}
      </main>
    );
  }

  if (view === 'guide') {
    return (
      <GuidePage
        onBack={() => setView('landing')}
        onLogin={() => setView('login')}
      />
    );
  }

  return (
    <main className="gg-landing-root">
      <div className="gg-landing-bg" role="img" aria-label="Geo-Guardian landing background" />
      <div className="gg-landing-vignette" />

      {view === 'landing' ? (
        <LandingPage
          onLogin={() => setView('login')}
          onGuide={() => setView('guide')}
        />
      ) : (
        <LoginPage
          onSubmit={async (email, password) => {
            const success = await handleLogin(email, password);
            if (success) {
              setView('dashboard');
            }
            return success;
          }}
          onBack={() => {
            clearAuthError();
            setView('landing');
          }}
          error={error}
        />
      )}
    </main>
  );
}

export default App;
