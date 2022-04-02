import {Route} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';
import DogDetail from './components/DogDetail.jsx';
import DogCreate from './components/DogCreate.jsx';
import SearchBar from './components/SearchBar.jsx';

function App() {
  return (
    <div> 
      <Route exact path='/' component = {Landing} />
      <Route path='/home' component = {SearchBar} />
      <Route path='/detail' component = {SearchBar} />
      <Route path='/create' component = {SearchBar} />
      <Route path='/home' render = {() => <Home/>} />
      <Route path='/create' render={() => <DogCreate />} />
      <Route path='/detail/:id' render={() => <DogDetail/> } />
    </div>
  );
}

export default App;
