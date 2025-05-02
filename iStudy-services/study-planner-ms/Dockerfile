FROM maven:3.9.9-amazoncorretto-17-debian AS builder

COPY src /app/src
COPY pom.xml /app

WORKDIR /app
RUN mvn dependency:resolve
RUN mvn clean package -DskipTests

FROM amazoncorretto:17

COPY --from=builder /app/target/*.jar /app/app.jar

WORKDIR /app

CMD ["java", "-jar", "app.jar"]