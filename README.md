# ncaatourney
NCAA Tourney is a web based application that allows you to create an NCAA Tournament Pool with a unique format. It is built
as a combination application using Spring Boot for the service layer, React and Bootstrap for the UI layer and MongoDB for 
the database layer. This project will show how to integrate a spring boot application with React as a single application
that can be run as a containerized application or a stand alone java application.

# How the Tourney works
In the NCAA tournament, following the play in games there 64 teams playing 6 rounds to determine the champion of the 
tournament. The tournament is divided into 4 regions with 16 teams in each region with seeds 1-16. In this tournament pool 
each participant will choose one team from each seed group 1-16. During the tournament, the user will get points for every
game one of their teams plays. The further their teams go, the more points they get. At the end, the participant with the 
highest overall combined score wins the pool.

# Building the Application
The application uses the frontend-maven-plugin for building the UI from the ncaatourney-ui module. This plugin will
automatically build and package the React application. Tho build every thing simply run:
```
mvn clean install
```

# Building a docker image
After building the application, you can create a docker image by running the following command:
```
docker build -t ncaatourney:2023
```

# Running the Application
You have multiple options for running the application.

## Standalone
To run the application standalone, you will have to have MongoDB already running and you will need to set the 
spring.data.mongodb.host property to the location of your mongo instance in the application.properties file. With the
property updated, you can start the application by simply executing a normal jar command using the jar file generated
in the service module.
```
java -jar ncaatourney-svc-0.0.1-SNAPSHOT.jar
```

## Running with Docker
After building a docker image, you can run the application with a normal ducker run command. Similar to running the
application standalone, you will need a running MongoDB instance prior to running.
```
docker run -p 8080:8080 -e SPRING_DATA_MONGODB_HOST: [mongohost] ncaatourney:2023
```

## Running with Docker Compose
In the base directory of the ncaatourney-svc module you will find a docker-compose.yml file. Using this file, you can
deploy the application and mongo db with a simple docker compose command:
```
docker-compose up
```