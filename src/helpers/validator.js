const validateTitleAndDescription = (taskInfo) => {
  return taskInfo.title.length > 0 && taskInfo.description.length > 0
}

class validator {
  static validateTaskInfo(taskInfo) {
    if(taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("isCompleted") &&
      validateTitleAndDescription(taskInfo))
    {
        return {
          "status": true,
          "message": "Task has been added"
        };
      }
      return {
        "status": false,
        "message": "Task Info is malformed please provide all the properties"
      }
  }
  static validateTaskUpdation(taskInfo) {
    if(taskInfo.hasOwnProperty("title") ||
      taskInfo.hasOwnProperty("description") ||
      taskInfo.hasOwnProperty("isCompleted"))
    {
        return {
          "status": true,
          "message": "Task has been added"
        };
      }
      return {
        "status": false,
        "message": "No feild provided to update"
      }
  }
}

module.exports = validator;
