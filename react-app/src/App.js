import './App.css';
import CardsGuest from './components/CardsGuest';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';

function App() {
  return (
    <div>
       <EditForm />
      <CreateForm />
      <CardsGuest />
    </div>
  );
}

export default App;
