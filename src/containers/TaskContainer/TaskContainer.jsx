import { useState, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { TaskItem } from '../../components'
import { ProjectTasksReference } from '../../firebase/References'
import { getAllTasks } from '../../store/actions/taskActions'
import { TaskList } from './TaskContainerStyles'
import { format } from 'date-fns'

export const TaskContainer = ({
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  sortOptions,
  setDashboardTasks,
  setProjectLoading,
}) => {
  const [taskData, setTaskData] = useState(null)
  const [projectTaskList, setProjectTaskList] = useState(null)
  const [overdueTasks, setOverdueTasks] = useState(null)

  const dispatch = useDispatch()

  const [snapshots, loading] = useCollection(
    ProjectTasksReference(project?.title).orderBy('createdAt', 'asc')
  )

  const taskList = useSelector(state => state.taskList)
  const { tasks } = taskList

  // useEffect(() => {
  //   setTaskData(null)

  // }, [project])

  const fetchData = () => {
    if (['today', 'upcoming'].includes(project?.title)) {
      const today = {
        field: 'dueDate',
        condition: '<=',
        query: format(new Date(), 'yyyy-MM-dd'),
      }

      const afterToday = {
        field: 'dueDate',
        condition: '>',
        query: format(new Date(), 'yyyy-MM-dd'),
      }

      project.title === 'today'
        ? dispatch(getAllTasks(today))
        : dispatch(getAllTasks(afterToday))
    } else {
      const data = []
      snapshots.docs.forEach(task => data.push(task.data()))
      data.length ? setTaskData(data) : setTaskData([])
    }
  }

  useEffect(() => {
    !loading && fetchData()
  }, [loading, snapshots])

  useEffect(() => {
    if (project?.title === 'today' && tasks) {
      const today = []
      const overdue = []

      tasks.forEach(task => {
        if (task.dueDate === format(new Date(), 'yyyy-MM-dd')) {
          today.push(task)
        } else {
          overdue.push(task)
        }
      })

      setOverdueTasks(overdue)
      setTaskData(today)
    } else {
      tasks && setTaskData(tasks)
    }
  }, [tasks])

  useEffect(() => {
    const { option, direction } = sortOptions
    const sortedData = []
    const restOfData = []

    taskData?.forEach(task => {
      if (task.isComplete && !isComplete) return
      sortOptions && task[option]
        ? sortedData.push(task)
        : restOfData.push(task)
    })

    const data = sortedData.concat(restOfData)
    switch (option) {
      case 'description':
        data.sort((a, b) =>
          a[option].toLowerCase().localeCompare(b[option].toLowerCase())
        )
        break
      default:
        data.sort((a, b) => a[option] - b[option])
    }

    direction === 'desc' && data.reverse()

    setProjectTaskList(data)
    setDashboardTasks(data)
  }, [taskData, sortOptions, project])

  useEffect(() => {
    console.log('Tasks: ', projectTaskList)
    projectTaskList && setProjectLoading(false)
  }, [projectTaskList])

  return (
    <TaskList>
      {projectTaskList
        ?.filter(task => task.isComplete == isComplete)
        .map(task => (
          <TaskItem
            key={task.id}
            task={task}
            setTasksToComplete={setTasksToComplete}
            setTasksToNotComplete={setTasksToNotComplete}
            setIsUndoVisible={setIsUndoVisible}
            clearTimer={clearTimer}
          />
        ))}
    </TaskList>
  )
}
