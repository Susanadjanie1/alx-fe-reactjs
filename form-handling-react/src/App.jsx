import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>User Registration Task Completion</h1>
      <RegistrationForm />
      <hr style={{ margin: '30px 0' }} />
      <FormikForm /> 
    </div>
  );
}

export default App;