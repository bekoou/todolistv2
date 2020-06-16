/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import shortid from 'shortid'

import cookieParser from 'cookie-parser'
import Html from '../client/html'

const port = process.env.PORT || 3000
const server = express()

const { readFile, writeFile } = require('fs').promises

server.use(cors())

const saveFile = async (category, task) => {
  await writeFile(`${__dirname}/task/${category}`, JSON.stringify(task), { encoding: 'utf8' })
}

const readingFile = (category) => {
  return readFile(`${__dirname}/task/${category}.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data) /* вернется текст, а не объект джаваскрипта */)
    .catch(() => [])
}

const getTasks = (task) => {
  return task.reduce((acc, rec) => {
    // eslint-disable-next-line no-underscore-dangle
    if (rec._isDeleted) {
      return acc
    }
    return [...acc, { taskId: rec.taskId, title: rec.title, status: rec.status }]
  }, [])
}

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

server.get('/api/v1/task/:category', async (req, res) => {
  const { category } = req.params
  const task = getTasks(await readingFile(category))
  res.json(task)
})

server.get('/api/v1/categories', async (req, res) => {
  // eslint-disable-next-line no-undef
  const getList = readdirSync(`${__dirname}/task`).concat((el) => el.split('.json')[0])
  res.send(getList)
})

server.get('/api/v1/task/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const task = await readingFile(category)
  const periodTime = {
    day: 1000 * 60 * 60 * 24,
    week: 7 * 1000 * 60 * 60 * 24,
    month: 30 * 1000 * 60 * 60 * 24
  }
  const filteredTask = getTasks(
    // eslint-disable-next-line no-underscore-dangle
    task.filter((el) => el._createdAt + periodTime[timespan] > +new Date())
  )
  res.json(filteredTask)
})

server.post('/api/v1/task/:category ', async (req, res) => {
  const { category } = req.params
  if (Object.keys(req.body).length === 0) {
    await saveFile(category, [])
  } else {
    const newTask = {
      taskId: shortid.generate(),
      title: req.body.title,
      username: 'Bret',
      status: 'new',
      _isDeleted: false,
      _createdAt: +new Date(),
      _deletedAt: null
    }
    const task = getTasks(await readingFile(category))
    const updatedTask = [...task, newTask]
    await saveFile(category, updatedTask)
    res.json({ status: 'success', newTask })
  }
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id, category } = req.params
  const newStatus = req.body
  const statuses = ['new', 'in progress', 'done', 'blocked']
  if (statuses.includes(newStatus.status)) {
    const task = await readingFile(category)
    const newTaskList = task.map((el) => (el.taskId === id ? { ...el, ...newStatus } : el))
    const updatedTask = getTasks(newTaskList.filter((el) => el.taskId === id))
    await saveFile(category, newTaskList)
    res.json(...updatedTask)
  } else {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
  }
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id, category } = req.params
  const task = await readingFile(category)
  const newTaskList = task.map((el) => (el.taskId === id ? { ...el, _isDeleted: true } : el))
  await saveFile(category, newTaskList)
  res.json({ status: 'success' })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

server.get('/', (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  res.send(
    Html({
      body: '',
      title
    })
  )
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.listen(port)

console.log(`Serving at http://localhost:${port}`)
