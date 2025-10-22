export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthData {
  email: string;
  password: string;
  name?: string;
}

const STORAGE_KEY = 'dataguard_user';
const USERS_KEY = 'dataguard_users';

export const signup = (data: AuthData): { success: boolean; error?: string; user?: User } => {
  if (!data.name || !data.email || !data.password) {
    return { success: false, error: 'All fields are required' };
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  if (users.find((u: User) => u.email === data.email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    email: data.email,
    createdAt: new Date().toISOString(),
  };

  users.push({ ...newUser, password: data.password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

  return { success: true, user: newUser };
};

export const login = (data: AuthData): { success: boolean; error?: string; user?: User } => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u: any) => u.email === data.email && u.password === data.password);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  const { password, ...userWithoutPassword } = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

  return { success: true, user: userWithoutPassword };
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};
