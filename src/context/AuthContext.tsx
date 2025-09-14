import { createContext, useReducer, type ReactNode } from "react";
import type { User, AuthState } from "@/types/index";

interface AuthContextValue extends AuthState {
  CreateUser: (newUser: {
    fullname: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    location: string;
  }) => Promise<void>;
  LoginUser: (email: string, password: string) => Promise<void>;
  Logout: () => void;
  UpdateUser: (userId: string, updatedUser: Partial<User>) => Promise<void>;
  GetAllUsers: () => Promise<void>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  users: [] as [],
  loading: false,
  error: "",
};

const BASE_URL = "http://localhost:8000";
function reducer(
  state: AuthState,
  action: {
    payload: User | User[] | string | null;
    type: string;
  }
): AuthState {
  switch (action.type) {
    case "user/loaded":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload as User,
        loading: false,
        error: "",
      };
    case "user/failed":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        loading: false,
        error: action.payload as string,
      };
    case "user/created":
      return {
        ...state,
        users: [...state.users, action.payload as User],
        loading: false,
        error: "",
      };
    case "user/updated":
      return {
        ...state,
        currentUser:
          state.currentUser?.id === (action.payload as User).id
            ? (action.payload as User)
            : state.currentUser,
        users: state.users.map((u) =>
          u.id === (action.payload as User).id ? (action.payload as User) : u
        ),
        loading: false,
        error: "",
      };
    case "users/fetched":
      return {
        ...state,
        users: action.payload as User[],
        loading: false,
        error: "",
      };
    case "loading":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "user/logout":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        loading: false,
        error: "",
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ isAuthenticated, currentUser, users, loading, error }, dispatch] =
    useReducer(reducer, initialState);

  const GetAllUsers = async () => {
    dispatch({
      type: "loading",
      payload: null,
    });
    try {
      const response = await fetch(`${BASE_URL}/user`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "users/fetched", payload: data });
    } catch (error: string | unknown) {
      dispatch({ type: "user/failed", payload: error as string });
      throw error;
    }
  };

  const UpdateUser = async (userId: string, updatedUser: Partial<User>) => {
    dispatch({
      type: "loading",
      payload: null,
    });
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "user/updated", payload: data });
    } catch (error: string | unknown) {
      dispatch({ type: "user/failed", payload: error as string });
    }
  };
  const CreateUser = async (newUser: {
    fullname: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    location: string;
  }) => {
    dispatch({
      type: "loading",
      payload: null,
    });
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.fullname,
          username: newUser.username,
          bio: newUser.bio,
          email: newUser.email,
          password: newUser.password,
          location: newUser.location,
        }),
      });
      const data = await response.json();
      dispatch({ type: "user/created", payload: data });
      dispatch({
        type: "user/loaded",
        payload: data,
      });
    } catch (error: string | unknown) {
      dispatch({ type: "user/failed", payload: error as string });
    }
  };

  const LoginUser = async (email: string, password: string) => {
    dispatch({ type: "user/failed", payload: "" });

    dispatch({
      type: "loading",
      payload: null,
    });

    try {
      const response = await fetch(`${BASE_URL}/user`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const usersArray = await response.json();
      const user = usersArray.find(
        (u: User) => u.email === email && u.password === password
      );

      if (user) {
        dispatch({ type: "user/loaded", payload: user });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      dispatch({ type: "user/failed", payload: errorMessage });
      throw error; // Re-throw to be caught by the component
    }
  };

  const Logout = () => {
    dispatch({ type: "user/logout", payload: null });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        users,
        loading,
        error,
        CreateUser,
        LoginUser,
        Logout,
        UpdateUser,
        GetAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
