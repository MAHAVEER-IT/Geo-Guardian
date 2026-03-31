import { useEffect, useState } from 'react';
import axios from 'axios';

const SESSION_STORAGE_KEY = 'gg_current_user_v1';
const TOKEN_STORAGE_KEY = 'gg_auth_token_v1';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://geo-guardian-backend.onrender.com';

const loadSessionUser = () => {
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const loadToken = () => {
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

function useRoleAuth() {
  const [currentUser, setCurrentUser] = useState(() => loadSessionUser());
  const [token, setToken] = useState(() => loadToken());
  const [error, setError] = useState('');

  const [managedUsers, setManagedUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [manageMessage, setManageMessage] = useState('');
  const [manageError, setManageError] = useState('');

  const authHeaders = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  const fetchManagedUsers = async () => {
    if (!token || !['master_admin', 'admin'].includes(currentUser?.role)) {
      setManagedUsers([]);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: authHeaders,
      });

      setManagedUsers(response.data?.users || []);
    } catch (requestError) {
      setManageError(
        requestError?.response?.data?.message || 'Failed to load users.'
      );
    }
  };

  useEffect(() => {
    fetchManagedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentUser?.role]);

  const handleLogin = async (email, password) => {
    try {
      setError('');
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const responseToken = response.data?.token;
      const user = response.data?.user;

      if (!responseToken || !user) {
        setError('Invalid server response during login.');
        return false;
      }

      setToken(responseToken);
      setCurrentUser(user);
      return true;
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message || 'Invalid credentials. Check email and password.'
      );
      return false;
    }
  };

  const clearAuthError = () => {
    setError('');
  };

  const clearManageFeedback = () => {
    setManageError('');
    setManageMessage('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken('');
    setManagedUsers([]);
    setNewUserEmail('');
    setNewUserPassword('');
    clearAuthError();
    clearManageFeedback();
  };

  const handleCreateVolunteer = async (event) => {
    event.preventDefault();
    clearManageFeedback();

    try {
      await axios.post(
        `${API_BASE_URL}/api/users`,
        {
          email: newUserEmail,
          password: newUserPassword,
          role: 'volunteer',
        },
        { headers: authHeaders }
      );

      setNewUserEmail('');
      setNewUserPassword('');
      setManageMessage('Volunteer account created successfully.');
      await fetchManagedUsers();
    } catch (requestError) {
      setManageError(
        requestError?.response?.data?.message || 'Failed to create volunteer.'
      );
    }
  };

  const changeUserRole = async (userId, role) => {
    if (!['master_admin', 'admin'].includes(currentUser?.role)) {
      setManageError('Only admin users can change roles.');
      return;
    }

    clearManageFeedback();

    try {
      await axios.patch(
        `${API_BASE_URL}/api/users/${userId}/role`,
        { role },
        { headers: authHeaders }
      );

      setManageMessage(role === 'admin' ? 'Volunteer promoted to admin.' : 'Admin set to volunteer.');
      await fetchManagedUsers();
    } catch (requestError) {
      setManageError(
        requestError?.response?.data?.message || 'Failed to change role.'
      );
    }
  };

  const deleteUser = async (userId) => {
    if (!['master_admin', 'admin'].includes(currentUser?.role)) {
      setManageError('Only admin users can remove users.');
      return;
    }

    if (currentUser?.id === userId) {
      setManageError('You cannot remove your own account while logged in.');
      return;
    }

    clearManageFeedback();

    try {
      await axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
        headers: authHeaders,
      });

      setManageMessage('User removed successfully.');
      await fetchManagedUsers();
    } catch (requestError) {
      setManageError(
        requestError?.response?.data?.message || 'Failed to remove user.'
      );
    }
  };

  return {
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
  };
}

export default useRoleAuth;
