import {useState} from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dateObj = new Date();
  const [day, setDay] = useState(days[dateObj.getDay()]);
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>Task Tracker</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Hey, it's {day}</h2>
      </div>
      <div className="input">
        <input name="inputfield" value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i className="fas fa-plus" onClick={() => {
          if(toDo !== '') {
            dateObj = new Date();
            console.log(`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`);
            setDay(days[dateObj.getDay()]);
            setToDos([...toDos, {id: Date.now(), text: toDo, status: false, date: `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`}]);
            setToDo('');}}}></i>
      </div>
    </div>
  );
}

export default App;
