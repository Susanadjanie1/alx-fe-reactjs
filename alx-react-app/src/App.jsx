import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';
import UserProfile from './components/UserProfile';

function App() {

  return (
    <>
      <WelcomeMessage />
      <Header />  
      <MainContent />
      <UserProfile />
      <Footer />
    </>
  )
}

export default App
