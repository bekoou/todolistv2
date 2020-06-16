import React, { useState } from 'react'

const TaskList = (props) => {
  const [newTask, setNewTask] = useState('')
  return (
    <div>
      {props.taskList.map((el) => (
        <div>
          {el.title}
          {el.status === 'new' && (
            <button type="button" onChange={() => props.updateStatus(el.task.id, 'in progress')}>
              In progress
            </button>
          )}
          {el.status === 'In progress' && (
            <div>
              <button type="button">Done</button>
              <button type="button">Block</button>
            </div>
          )}
        </div>
      ))}
      <input type="text" className="bg-gray-200" onChange={(e) => setNewTask(e.target.value)} />
      {/* eslint-disable-next-line react/button-has-type */}
      <button typeof="button" onClick={props.addTask(newTask.title)}>
        Go
      </button>
    </div>
  )
}

export default TaskList
