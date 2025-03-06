# iStudy [In development]

## About
This repository contains the ongoing development of the complete infrastructure (Back-End and Front-End) of the iStudy project.

### What is iStudy?
iStudy is a web platform designed to help students organize and optimize their learning process efficiently. The system provides:

- User registration for a personalized experience.
- Management of subjects and categories to structure learning effectively.
- Study session tracking linked to specific subjects.
- Interactive flashcards and quizzes to reinforce memory and active learning.
- Progress monitoring, with indicators for completion, performance and time spent.
- A statistics dashboard, offering insights into study habits.

## Project Structure
- `istudy-app`: This folder contains the front-end code of the application, built with TypeScript and ReactJS.
- `istudy-services`: This folder contains the system's back-end (Java/Spring Boot), which follows a microservices architecture using Spring Cloud API Gateway as a request interceptor and Service Discovery (Eureka) for service registration and discovery.

![istudy_architecture.png](docs%2Fimages%2Fistudy_architecture.png)
(Preliminary draft of the system architecture. Some inaccuracies may be present as I am still in the learning and understanding phase.)

## Technologies Used

At the moment, these are the technologies used:

* **Java**: A high-level, object-oriented programming language widely used for building server-side applications, web services, and Android applications.

* **TypeScript**: A superset of JavaScript that adds static typing, making code easier to read, debug, and maintain.

* **Spring Boot**: A framework that simplifies the development of Java applications by providing built-in features for dependency injection, configuration, and microservices support.

* **ReactJS**: A JavaScript library for building user interfaces, focusing on creating reusable UI components and managing the view layer in web applications.

* **Docker**: A platform that allows developers to automate the deployment of applications inside lightweight containers, ensuring consistency across different environments and simplifying the setup process.

* **MySQL**: A relational database management system used for reliable data storage and management.

* **Spring Cloud API Gateway**: Serves as the central entry point, handling request routing, authentication, and traffic control between microservices.

* **Eureka (Service Discovery)**: Enables automatic registration and discovery of microservices, facilitating dynamic scaling and seamless communication.

* **MapStruct**: A Java mapping framework that simplifies object-to-object mapping, reducing boilerplate code and improving maintainability.

* **Flyway**: A database migration tool that ensures version control and consistency across database schema changes.

* **Spring Security**: A powerful and customizable authentication and access control framework for Java applications.

* **JWT (JSON Web Token)**: Open standard that allows secure transmission of authentication information.

* **Lombok**: A Java library that reduces boilerplate code by generating common methods like getters, setters, constructors, and more through annotations.

* **JPA**: The Java Persistence API, a specification that provides object-relational mapping (ORM) to manage relational data in Java applications.

* **Postman**: A tool used for API testing and development, enabling users to send HTTP requests, inspect responses, and automate API tests.

## iStudy-services - Back-End
### Summary endpoints
As the project is still in progress and subject to changes, this is a brief summary of all the available endpoints in each microservice and their functionality:

#### 1. AUTH-MS
- Authentication and user management microservice.

| Method  | Endpoint                  | Description                         | Request Body                   | Response Body                           |
|---------|---------------------------|------------------------------------------|--------------------------------|-----------------------------------------|
| **POST**  | /auth/login              | Authenticates a user and returns a JWT token | LoginRequestDto (email, password) | LoginResponseDto (JWT token)           |
| **POST**  | /auth/register           | Registers a new user                     | RegisterRequestDto (name, email, password) | RegisterResponseDto (confirmation message) |
| **GET**   | /auth/authenticated-user  | Retrieves the authenticated user from the token | N/A | String (user ID or error message) |
| **GET**   | /users/{id}              | Fetches a user by ID if authorized      | N/A | User (user details) |

#### 2. DISCIPLINE-MS
- Microservice responsible for creating, updating, deleting, and generating information about disciplines and their topics.

Discipline Endpoints

| Method  | Endpoint                      | Description                                              | Request Body                   | Response Body                          |
|---------|--------------------------------|----------------------------------------------------------|--------------------------------|----------------------------------------|
| **POST**   | /disciplines                 | Creates a new discipline                                 | DisciplineRequestDto           | List<Discipline>                      |
| **PUT**    | /disciplines/{id}            | Updates an existing discipline by ID                     | DisciplineRequestDto           | List<Discipline>                      |
| **DELETE** | /disciplines/{id}            | Deletes a discipline by ID                               | N/A                            | List<Discipline>                      |
| **GET**    | /disciplines                 | Retrieves a discipline by name                           | N/A (Query Param: name)        | Discipline                            |
| **GET**    | /disciplines/all             | Retrieves all disciplines                                | N/A                            | List<Discipline>                      |
| **GET**    | /disciplines/{id}            | Retrieves a discipline by ID                             | N/A                            | Discipline                            |
| **GET**    | /disciplines/category/{category} | Retrieves all disciplines by category                    | N/A                            | List<Discipline>                      |
| **GET**    | /disciplines/search          | Returns all disciplines that have the searched character | N/A (Query Param: name)        | List<Discipline>                      |
| **GET**    | /disciplines/completed       | Retrieves all completed disciplines                      | N/A                            | List<Discipline>                      |

Topic Endpoints

| Method  | Endpoint                      | Description                                | Request Body                   | Response Body                          |
|---------|--------------------------------|-------------------------------------------------|--------------------------------|----------------------------------------|
| **POST**   | /disciplines/topics          | Creates a new topic                             | TopicRequestDto                | List<TopicResponseDto>                 |
| **PUT**    | /disciplines/topics/{id}     | Updates an existing topic by ID                 | TopicUpdateDto                 | List<TopicResponseDto>                 |
| **DELETE** | /disciplines/topics/{id}     | Deletes a topic by ID                           | N/A                            | List<TopicResponseDto>                 |
| **GET**    | /disciplines/topics          | Retrieves a topic by name                       | N/A (Query Param: name)        | TopicResponseDto                       |
| **GET**    | /disciplines/topics/all      | Retrieves all topics                            | N/A                            | List<TopicResponseDto>                 |
| **GET**    | /disciplines/topics/{id}     | Retrieves a topic by ID                         | N/A                            | TopicResponseDto                       |

#### 3. STUDY-TRACKER-MS
- This microservice is responsible for managing study sessions. It allows users to create, update, retrieve, and delete study records.
- Additionally, it provides analytical insights into study habits based on different time periods.

| **Method** | **Endpoint**                 | **Description**                                | **Request Body**                                | **Example**                                      |
|-----------|------------------------------|------------------------------------------------|-------------------------------------------------|--------------------------------------------------|
| **POST**  | `/studies`                    | Creates a new study record.                   | `StudyRequestDto`                               | -                                                |
| **PUT**   | `/studies/{id}`               | Updates a study record by ID.                 | Path variable: `{id} (String)`, `StudyRequestDto` | -                                                |
| **DELETE** | `/studies/{id}`              | Deletes a study record by ID.                 | Path variable: `{id} (String)`                  | -                                                |
| **GET**   | `/studies/all`                | Retrieves all study records.                  | None                                            | -                                                |
| **GET**   | `/studies/{id}`               | Retrieves a study by ID.                      | Path variable: `{id} (String)`                  | -                                                |
| **GET**   | `/studies/completed`          | Retrieves completed study sessions.           | None                                            | -                                                |
| **GET**   | `/studies/date`               | Retrieves studies by a specific date.         | Query param: `date (String, YYYY-MM-DD)`        | `GET /studies/date?date=2024-03-01`              |
| **GET**   | `/studies/month`              | Retrieves studies for a specific month.       | Query param: `year (Integer), month (Integer)`  | `GET /studies/month?year=2024&month=3`           |
| **GET**   | `/studies/month/info`         | Retrieves study statistics for a month.       | Query param: `year (Integer), month (Integer)`  | `GET /studies/month/info?year=2024&month=3`      |
| **GET**   | `/studies/week`               | Retrieves studies for a specific week.        | Query param: `year (Integer), week (Integer)`   | `GET /studies/week?year=2024&week=10`            |
| **GET**   | `/studies/week/info`          | Retrieves study statistics for a week.        | Query param: `year (Integer), week (Integer)`   | `GET /studies/week/info?year=2024&week=10`       |
| **GET**   | `/studies/subject-category`   | Retrieves studies by subject category.        | Query param: `category (String)`               | `GET /studies/subject-category?category=Math`    |

#### 4. STUDY-GAMIFICATION-MS
- Microservice that manages the creation of quizzes and flashcards to enhance user learning.

Quiz Endpoints

| Method   | Endpoint                      | Description                                       | Request Body     | Response Body     |
|----------|--------------------------------|---------------------------------------------------|------------------|-------------------|
| **POST**  | `/games/quizzes`              | Creates a new quiz                                | `QuizRequestDto` | `List<Quiz>`      |
| **PUT**   | `/games/quizzes/{id}`         | Updates a quiz by ID                              | `QuizRequestDto` | `List<Quiz>`      |
| **PUT**   | `/games/quizzes/answer/{id}`  | Answers a quiz by ID and returns wrong answers | `QuizAnswerDto`  | `List<Question>`  |
| **DELETE** | `/games/quizzes/{id}`        | Deletes a quiz by ID                              | -                | `List<Quiz>`      |
| **GET**   | `/games/quizzes/all`          | Retrieves all quizzes                             | -                | `List<Quiz>`      |
| **GET**   | `/games/quizzes/{id}`         | Retrieves a quiz by ID                            | -                | `Quiz`            |
| **GET**   | `/games/quizzes/search?title={title}` | Retrieves a quiz by title                         | -                | `Optional<Quiz>`  |

Flashcard Endpoints

| Method   | Endpoint                          | Description                    | Request Body          | Response Body      |
|----------|----------------------------------|--------------------------------|-----------------------|--------------------|
| **POST**  | `/games/flashcards`              | Creates a new flashcard        | `FlashcardRequestDto` | `List<Flashcard>` |
| **PUT**   | `/games/flashcards/{id}`         | Updates a flashcard by ID      | `FlashcardRequestDto` | `List<Flashcard>` |
| **PUT**   | `/games/flashcards/answer/{id}`  | Answers a flashcard by ID and return cards marked as wrong     | `FlashcardAnswerDto`  | `List<Card>`      |
| **DELETE** | `/games/flashcards/{id}`        | Deletes a flashcard by ID      | -                     | `List<Flashcard>` |
| **GET**   | `/games/flashcards/all`         | Retrieves all flashcards       | -                     | `List<Flashcard>` |
| **GET**   | `/games/flashcards/{id}`        | Retrieves a flashcard by ID    | -                     | `Flashcard`       |
| **GET**   | `/games/flashcards/search?title={title}` | Retrieves a flashcard by title | -                     | `Optional<Flashcard>` |

#### STATUS CODE MEANINGS
- **`200 OK`** → Request was successful.
- **`201 Created`** → A new resource was successfully created.
- **`400 Bad Request`** → Invalid input parameters or a duplicate name exists.
- **`401 Unauthorized`** → User must be authenticated to perform this action.
- **`404 Not Found`** → The requested resource does not exist.

## iStudy-app - Front-End
- In development.

## Requirements
To run the project on your machine, the following tools must be installed and configured beforehand:

- Docker
- Git

Optional for local development or testing:

- Java Development Kit (JDK) 17
- Node.js
- Apache Maven
- MySQL 8.0.34
- MySQL Workbench
- Postman

## Installation guide
Follow the steps below to download, configure, and run the project in your environment:

1. **Clone the repository**
```bash
git clone https://github.com/ABeatrizSC/istudy.git
 ```

2. **Navigate to the project directory**

```bash
cd istudy
 ```

3. **Build and initialize the docker container**

 ```bash
docker-compose up --build
 ```

## Contact
* GitHub: [ABeatrizSC](https://github.com/ABeatrizSC)
* Linkedin: [Ana Beatriz Santucci Carmoni](www.linkedin.com/in/ana-carmoni)
* Email: [anabeatrizscarmoni@gmail.com](mailto:anabeatrizscarmoni@gmail.com)