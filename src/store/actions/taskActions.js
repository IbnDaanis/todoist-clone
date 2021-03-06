import { format } from 'date-fns'
import { firestore } from '../../config/firebase'
import {
  TASK_COMPLETE_FAIL,
  TASK_COMPLETE_REQUEST,
  TASK_COMPLETE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAIL,
} from '../constants/taskConstants'

export const createTask = (project, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task.id)
      .set(task)

    dispatch({
      type: TASK_CREATE_SUCCESS,
    })
  } catch (error) {
    console.log({ error })
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error,
    })
  }
}

export const editTask = (project, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task.id)
      .update(task)

    dispatch({
      type: TASK_CREATE_SUCCESS,
    })
  } catch (error) {
    console.log({ error })
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error,
    })
  }
}

export const completeTask = (task, project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_COMPLETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task)
      .update({ isComplete: true })
      .then(() => {
        console.log('Document successfully completed!')
      })

    dispatch({
      type: TASK_COMPLETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TASK_COMPLETE_FAIL,
      payload: error,
    })
  }
}

export const incompleteTask = (task, project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_COMPLETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task)
      .update({ isComplete: false })
      .then(() => {
        console.log('Document successfully not completed!')
      })

    dispatch({
      type: TASK_COMPLETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TASK_COMPLETE_FAIL,
      payload: error,
    })
  }
}

export const deleteTask = (task, project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await firestore
      .collection('users')
      .doc(userInfo?.id)
      .collection('projects')
      .doc(project)
      .collection('tasks')
      .doc(task)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
      })

    dispatch({
      type: TASK_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error,
    })
  }
}

export const getAllTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_REQUEST,
    })

    const {
      userLogin: { userInfo },
      projectList: { projects },
    } = getState()

    let allTasks = []
    await projects.forEach(proj => {
      firestore
        .collection('users')
        .doc(userInfo?.id)
        .collection('projects')
        .doc(proj.title)
        .collection('tasks')
        .onSnapshot(snapshot => {
          const data = []

          if (snapshot.docChanges()[0]?.type === 'removed') {
            allTasks = allTasks.filter(task => task.id !== snapshot.docChanges()[0]?.doc?.id)
          }

          snapshot.docs.forEach(task => {
            const currentTask = task.data()
            const taskExists = allTasks.find(item => item.id === task.id)

            if (taskExists && currentTask.project) {
              const index = allTasks.findIndex(item => item.id === task.id)
              allTasks[index] = { ...taskExists, ...currentTask }
              data.push({ ...taskExists, ...currentTask })
            } else {
              allTasks.push(currentTask)
              data.push(currentTask)
            }
          })

          dispatch({
            type: TASKS_SUCCESS,
            payload: {
              [proj.title]: data,
            },
          })

          dispatch({
            type: TASKS_SUCCESS,
            payload: {
              overdue: allTasks.filter(
                task =>
                  task.dueDate &&
                  task.dueDate !== format(new Date(), 'yyyy-MM-dd') &&
                  new Date(task.dueDate) < new Date(format(new Date(), 'yyyy-MM-dd'))
              ),

              today: allTasks.filter(task => task.dueDate === format(new Date(), 'yyyy-MM-dd')),

              upcoming: allTasks.filter(
                task => new Date(task.dueDate) > new Date(format(new Date(), 'yyyy-MM-dd'))
              ),
            },
          })
        })
    })
  } catch (error) {
    dispatch({
      type: TASKS_FAIL,
      payload: error,
    })
  }
}
