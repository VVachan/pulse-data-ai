import { getAuth } from "firebase/auth";
import { app } from "@/firebase"; // Ensure 'app' is exported from your firebase config
const auth = getAuth(app);
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";

// Define the User interface (for type safety)
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface AuthData {
  email: string;
  password: string;
  name?: string;
}

// ---------------------- SIGNUP ----------------------
export const signup = async (
  data: AuthData
): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    if (!data.name || !data.email || !data.password) {
      return { success: false, error: "All fields are required" };
    }

    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Update display name in Firebase user profile
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: data.name });
    }

    const user = userCredential.user;
    const newUser: User = {
      id: user.uid,
      name: data.name,
      email: user.email || "",
      createdAt: new Date().toISOString(),
    };

    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { success: false, error: error.message };
  }
};

// ---------------------- LOGIN ----------------------
export const login = async (
  data: AuthData
): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;
    const loggedInUser: User = {
      id: user.uid,
      name: user.displayName || "",
      email: user.email || "",
    };

    return { success: true, user: loggedInUser };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
};

// ---------------------- LOGOUT ----------------------
export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// ---------------------- GET CURRENT USER ----------------------
export const getCurrentUser = (): User | null => {
  const user: FirebaseUser | null = auth.currentUser;
  if (!user) return null;

  return {
    id: user.uid,
    name: user.displayName || "",
    email: user.email || "",
  };
};

// ---------------------- IS AUTHENTICATED ----------------------
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};

// ---------------------- AUTH STATE LISTENER ----------------------
import { onAuthStateChanged } from "firebase/auth";

export const onAuthChange = (callback: (user: User | null) => void): void => {
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const currentUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
      };
      callback(currentUser);
    } else {
      callback(null);
    }
  });
};
