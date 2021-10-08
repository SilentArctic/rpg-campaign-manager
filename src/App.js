import Header from './components/Header';
import routes from './routes';
import './reset.css';
import './App.scss';

function App() {
   return (
      <div className="App">
         <Header />
         {routes}
      </div>
   );
}

export default App;
