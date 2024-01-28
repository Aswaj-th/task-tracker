import React from 'react';
import './TodoItem.css';
import Button from 'react-bootstrap/Button';

function TodoItem({obj, onChange, delEl, onDragStart, onDragEnter, onDragEnd}) {
    let curClass;
    if(obj.status) curClass = 'top del';
    else curClass = 'top';
    return (
    <div className="todo" key={obj.id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={(e) => e.preventDefault()}>
        <div className={curClass}>
            <div className="left">
                <p draggable>{obj.text}</p>
            </div>
            <div className="right">
                {obj.date}
            </div>
        </div>
        <div className="bottom">
            <div className="left">
                <Button variant='primary' onClick={(e) => {
                    onChange(!obj.status);
                }}>Done</Button>
            </div>
            <div className="right">
                <Button variant='primary' onClick={delEl}>Delete</Button>
            </div>
        </div>
        {/* <div className="left">
            <input value={obj.status} type="checkbox" onChange={(e) => onChange(e.target.checked)} name="item"/>
            <p>{obj.text}</p>
        </div>
        <div className="right">
        <i className="fas fa-times" onClick={delEl}></i>
        </div> */}
    </div>
  )
}

export default TodoItem;