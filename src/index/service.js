import storage from '@system.storage'

const STORAGE_KEY = 'todos-vuejs-2.0'
const todoList = [{
  id: 0,
  title: 'react',
  completed: false
},
{
  id: 1,
  title: 'vue',
  completed: false
}]

export const storageService = {
  fetch() {
    return new Promise((resolve, reject) => {
      storage.get({
        key: STORAGE_KEY,
        success(data) {
          const todos = data && JSON.parse(data) || todoList
          todos.forEach((todo, index) => {
            todo.id = index
          })
          storageService.uid = todos.length
          resolve(todos)
        },
        fail() {
          console.info('read fail')
        },
        complete() {
          console.info('read complete')
        }
      })
    })
  },
  save(todos) {
    return new Promise((resolve, reject) => {
      storage.set({
        key: STORAGE_KEY,
        value: JSON.stringify(todos),
        success() {
          resolve()
          console.log('save success')
        },
        fail() {
          reject()
          console.log('save fail')
        }
      })
    })
  }
}

export const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => {
      return !todo.completed
    })
  },
  completed(todos) {
    return todos.filter(todo => {
      return todo.completed
    })
  }
}
