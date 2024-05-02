import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import "antd/dist/antd.variable.min.css";
import Signup from './Components/Signup';
import { BrowserRouter as Router } from 'react-router-dom';
import Grades from './Components/Grades';
import Subjects from './Components/Subjects';
import SubjectDetails from './Components/SubjectDetails';

function App() {
  return (
    <Router basename='/faculty'>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/sign-up" exact component={Signup} />
        <Route path="/home" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/subjects" exact component={Subjects} />
        <Route path="/subjects/:id" exact component={SubjectDetails} />
        <Route path="/grades" exact component={Grades} />
      </Switch>
    </Router>
  );
}

export default App;
