import users from "../../pseudo_db/users.json";

export const handleLogin = async (email: string, password: string) => {
  try {
    // 1. Cek dari users.json
    const userFromJson = users.find(
      (u) => u.email === email && u.password === password
    );

    // 2. Cek dari localStorage (data signup)
    const stored = localStorage.getItem("newUser");
    const localUsers = stored ? JSON.parse(stored) : [];

    const userFromLocal = localUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    // Jika user ditemukan di salah satu sumber
    const finalUser = userFromJson || userFromLocal;

    if (finalUser) {
      localStorage.setItem("currentUser", JSON.stringify(finalUser));

      return {
        success: true,
        message: "Login successful",
        user: finalUser,
      };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

export const handleLogout = () => {
    localStorage.removeItem('currentUser');
};
