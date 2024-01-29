import {useState, useEffect, useRef} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Button from 'react-bootstrap/Button';
// import DynamicBackground from './DynamicBackground';

const initTodo = [];

const getInitialItems = () => {
  const items = localStorage.getItem('todos');
  return items ? JSON.parse(items) : initTodo;
}



function App() {
  const [toDos, setToDos] = useState(getInitialItems);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]);

  const [toDo, setToDo] = useState('');
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dateObj = new Date();
  const [day, setDay] = useState(days[dateObj.getDay()]);
  const [sorted, setSorted] = useState(false);
  //const [hour, setHour] = useState(dateObj.getHours());

  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  const handleSort = () => {
    const toDosClone = [...toDos];
    const temp = toDosClone[dragItem.current];
    toDosClone[dragItem.current] = toDosClone[draggedOverItem.current];
    toDosClone[draggedOverItem.current] = temp;
    setToDos(toDosClone);
  }

  return (
    <>
    {/* <DynamicBackground /> */}
    <div className="app">
      <div className="new">
      <div className="mainHeading">
        <h1>Task Tracker</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Hey, it's {day}</h2>
      </div>
      <div className="filteroption">
        <Button onClick={() => setSorted(sorted => !sorted)}>{sorted && "Un"}Filter</Button>
      </div>
      <div className="input">
        <input 
          name="inputfield" 
          value={toDo} 
          onChange={(e)=>setToDo(e.target.value)} 
          onKeyDown={(e) => {
            if((e.key === 'Enter') && (toDo !== '')) {
                dateObj = new Date();
                //console.log(`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`);
                setDay(days[dateObj.getDay()]);
                setToDos([...toDos, {id: Date.now(), text: toDo, status: false, date: `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`}]);
                setToDo('');
              }
            }
          }
          type="text" 
          placeholder="🖊️ Add item..." 
        />
        <i className="fas fa-plus" 
          onClick={() => {
            if(toDo !== '') {
              dateObj = new Date();
              //console.log(`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`);
              setDay(days[dateObj.getDay()]);
              setToDos([...toDos, {id: Date.now(), text: toDo, status: false, date: `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`}]);
              setToDo('');
            }
          }}></i>
      </div>
      {
        !sorted && 
          <div className="todos">
            {toDos.map((obj, index) => {
              return (
                <TodoItem 
                  key={obj.id} 
                  obj={obj} 
                  onChange={(val) => {
                    setToDos(toDos.filter(obj2 => {
                      if(obj2.id === obj.id) {
                          obj2.status=val;
                      }
                      return obj2;
                    }))
                  }}
                  delEl={() => {
                    setToDos(toDos.filter(obj2 => {
                      if(obj2.id === obj.id) return null;
                      return obj2;
                    }))
                  }} 
                  onDragStart={() => {dragItem.current = index}} 
                  onDragEnter={() => {draggedOverItem.current = index}} 
                  onDragEnd={handleSort}
                  draggable={true}
                />
              )
            })}
          </div>
      }
      {
        sorted &&
          <div className="todos">
            <div className="todo notDone">
              {toDos.filter((obj) => {
                if(!obj.status) {
                  return obj;
                }
                return null;
              }).length !== 0 && <h3>InComplete Tasks</h3> }
              {toDos.filter((obj) => {
                if(!obj.status) {
                  return obj;
                }
                return null;
              }).map((obj, index) => {
                return (
                  <TodoItem 
                    key={obj.id} 
                    obj={obj} 
                    onChange={(val) => {
                      setToDos(toDos.filter(obj2 => {
                        if(obj2.id === obj.id) {
                            obj2.status=val;
                        }
                        return obj2;
                      }))
                    }}
                    delEl={() => {
                      setToDos(toDos.filter(obj2 => {
                        if(obj2.id === obj.id) return null;
                        return obj2;
                      }))
                    }} 
                    draggable={false} 
                    onDragStart={() => {dragItem.current = index}} 
                    onDragEnter={() => {draggedOverItem.current = index}} 
                    onDragEnd={handleSort}
                  />
                )
              })}
            </div>
            <div className="todo Done">
              {toDos.filter((obj) => {
                if(obj.status) {
                  return obj;
                }
                return null;
              }).length !== 0 && <h3>Completed Tasks</h3> }
              {toDos.filter((obj) => {
                if(obj.status) {
                  return obj;
                }
                return null;
              }).map((obj, index) => {
                return (
                  <TodoItem 
                    key={obj.id} 
                    obj={obj} 
                    onChange={(val) => {
                      setToDos(toDos.filter(obj2 => {
                        if(obj2.id === obj.id) {
                            obj2.status=val;
                        }
                        return obj2;
                      }))
                    }}
                    delEl={() => {
                      setToDos(toDos.filter(obj2 => {
                        if(obj2.id === obj.id) return null;
                        return obj2;
                      }))
                    }} 
                    draggable={false} 
                    onDragStart={() => {dragItem.current = index}} 
                    onDragEnter={() => {draggedOverItem.current = index}} 
                    onDragEnd={handleSort}
                  />
                )
              })}
            </div>
          </div>
      }
      </div>
    </div>
    </>
  );

}

export default App;
