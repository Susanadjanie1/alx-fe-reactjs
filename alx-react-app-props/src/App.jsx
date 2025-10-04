import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';
import UserProfile from './components/UserProfile';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <>
      <WelcomeMessage />
      <Header />  
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
      <MainContent />
      <UserProfile 
        name="Alice"
        age={25}
        bio="Loves hiking and photography"
      />
      <Footer />
    </>
  )
}

export default App
