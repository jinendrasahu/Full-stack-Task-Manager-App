
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import CreateTask from './components/CreateTask';
import { useNavigate ,Route,Routes} from 'react-router-dom';
import ListTasks from './components/ListTasks';
import EditTask from './components/EditTask';
import Logout from './components/Logout';

function App() {
  let [message, setMessage] = useState("");
  let [error, setError] = useState(false);
  let [verified, setVerified] = useState(true);
  let [token, setToken] = useState("");
  let [authenticated, setAuthenticated] = useState(false);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  function verify(token) {
    fetch(`http://localhost:4000/verifytoken?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => data.json())
      .then((data) => {
      
        setToken(token);
        setLoading(false);
        setAuthenticated(true);
        
      }).catch((err) => {
        setLoading(false);
        setAuthenticated(false);
      })
  }
  useEffect(() => {
    let cookie = document.cookie;
    if (cookie) {
      let [key, value] = cookie.split("=");
      if (key === "token" && value && value!="undefined") {
        verify(value);
      } else {
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  }, [])

  function setMessageData(error, msg) {
    setMessage(msg);
    setError(error);
  }

  function setVerification(verification) {
    setVerified(verification)
  }
  function setLoadingPage(load) {
    setLoading(load)
  }
  return (
    <>

      {loading ? <div className='main-page'><div className='loader'></div></div> : ""}
      <Navbar authenticated={authenticated}/>
      {message ? <div className={error ? 'error' : 'success'}>
        <div><b>{error ? 'Error' : 'Message'} : </b>{message}<button className='clear' onClick={()=>{setError(false);setMessage("");}}>Close</button></div>
      </div> : ""}
      <Routes>
          <Route path="/login" element={<Login authenticated={authenticated} setLoadingPage={setLoadingPage} setMessage={setMessageData} />} />
          <Route path="/register" element={<Register authenticated={authenticated} setLoadingPage={setLoadingPage} setVerification={setVerification} setMessage={setMessageData} />} />
          <Route path="/tasks" element={<ListTasks authenticated={authenticated} token={token} setLoadingPage={setLoadingPage} setMessage={setMessageData}/>} />
          <Route path="/edit" element={<EditTask authenticated={authenticated} token={token} setLoadingPage={setLoadingPage} setMessage={setMessageData} />}/>
          <Route path="/logout" element={<Logout authenticated={authenticated} token={token} setLoadingPage={setLoadingPage} setMessage={setMessageData}/>} />

          <Route path="*" element={<CreateTask/>} />
          <Route path="/" element={<CreateTask authenticated={authenticated} token={token} setLoadingPage={setLoadingPage} setMessage={setMessageData} />}/>

      </Routes>
      </>
  );
}

export default App;
