import { useEffect } from 'react';
import Login from './components/Login';
import { User } from './features/user';

const getUserFromStorage = () => {
  let user: string | null = localStorage.getItem("user");
  if (!user) {
    user = JSON.stringify([{
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      password: "Admin",
      isLoggedIn: false,
      createdAt: new Date(),
    }]);
    localStorage.setItem("user", user);
  }
  return user;
}

function App() {
  useEffect(() => {
    const user = getUserFromStorage();
  }, []); // loads only first time

  return <Login />;
}

export default App;
