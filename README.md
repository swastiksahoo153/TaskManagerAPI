# Task Manager
Task manager is a RESTful API using Node.js, Express.js. The API will allow users to Create, Read, Update, and Delete tasks. The tasks have a title, description, and a flag for completion status. The API is testable using Postman or Curl.

## Data Schema
```
{
  id: string,
  title*: "string",
  description*: "string",
  completed: boolean,
  createdAt: Date
}
```

## Endpoints
```
Base Endpoint: http://localhost:3000/api/v1
```

```
GET /tasks 

  query params: {
    sortBy: createdAt,
    filterBy: isCompleted
  }

get all tasks available
```

```
GET /tasks/:taskId

get a task by given taskId  
```

```
POST /tasks 

  body: {
    title*: string,
    description*: string,
    completed: boolean
  }

add new task 
```

```
PUT /tasks/:taskId 

  body: {
    task: {
      title: string,
      description: string,
      completed: boolean
    }
  }

update a task by taskId
```

```
DELETE /tasks/:taskId

delete a task by given taskId  
```