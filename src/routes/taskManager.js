const tasksRoutes = require('express').Router();
const taskData = require('../tasks.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const { 
  v4: uuidv4,
} = require('uuid');

tasksRoutes.use(bodyParser.urlencoded({ extended: false }));
tasksRoutes.use(bodyParser.json());


tasksRoutes.get('/', (req, res) => {
  let queries = req.query;
  let taskResponse = taskData.tasks;
  if (queries.hasOwnProperty('filterBy')) {
    if(queries.filterBy == 'isCompleted') {
      taskResponse = taskResponse.filter(task => task.isCompleted == 'true');
    }else {
      res.status = 400;
      res.json({ error: "Only filter by isCompleted is supported" });
    }
  }

  if (queries.hasOwnProperty('sortBy')) {
    if (queries.sortBy == 'createdAt') {
      taskResponse = taskResponse.sort(task => task.createdAt);
    } else {
      res.status = 400;
      res.json({ error: "Only sort by createdAt is supported" });
    }
  }

  res.status(200);
  res.send(taskResponse);
});

tasksRoutes.get('/:taskId', (req, res) => {
  let tasks = taskData.tasks;
  let idPassed = req.params.taskId;
  let result = tasks.filter(val => val.taskId == idPassed);

  res.status(200);
  res.send(result);
})


tasksRoutes.post('/', (req, res) => {
  const task = req.body;
  let writePath = path.join(__dirname, '..', 'tasks.json');
  if(validator.validateTaskInfo(task).status) {
    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    task['taskId'] = uuidv4();
    task['createdAt'] = new Date(),
    taskDataModified.tasks.push(task);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json(validator.validateTaskInfo(task, taskData));
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(task, taskData))
  }
});


tasksRoutes.put('/:taskId', (req, res) => {
  const task = req.body;
  let idPassed = req.params.taskId;
  let writePath = path.join(__dirname, '..', 'tasks.json');

  if (validator.validateTaskUpdation(task).status) {
    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    let index = taskDataModified.tasks.findIndex(t => t.taskId == idPassed);

    if (index === -1) {
      res.status(400);
      res.json({ message: 'Task not found' });
    }

    taskDataModified.tasks[index] = { ...taskDataModified.tasks[index], ...task };
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json("Tasks updated successfully!");
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(task, taskData))
  }
});


tasksRoutes.delete('/:taskId', (req, res) => {
  let idPassed = req.params.taskId;
  let writePath = path.join(__dirname, '..', 'tasks.json');
  let taskDataModified = JSON.parse(JSON.stringify(taskData));
  let index = taskDataModified.tasks.findIndex(t => t.taskId == idPassed);

  if (index === -1) {
    res.status(400);
    res.json({ message: 'Task not found' });
  }

  taskDataModified.tasks.splice(index, 1);

  fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
  res.status(200);
  res.json("Task deleted successfully!");
});

module.exports = tasksRoutes;