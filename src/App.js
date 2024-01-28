import {useState} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

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
            //console.log(`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`);
            setDay(days[dateObj.getDay()]);
            setToDos([...toDos, {id: Date.now(), text: toDo, status: false, date: `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`}]);
            setToDo('');}}}></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <TodoItem key={obj.id} obj={obj} onChange={(val) => {
              setToDos(toDos.filter(obj2 => {
              if(obj2.id === obj.id) {
                  obj2.status=val;
              }
              return obj2;
              }))
            }} delEl={() => {
              setToDos(toDos.filter(obj2 => {
              if(obj2.id === obj.id) return null;
              return obj2;
              }))
            }}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
