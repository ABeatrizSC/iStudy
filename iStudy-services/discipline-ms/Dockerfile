FROM maven:3.9.9-amazoncorretto-17-debian AS builder

COPY src /app/src
COPY pom.xml /app

WORKDIR /app
RUN mvn dependency:resolve
RUN mvn clean package -DskipTests

FROM amazoncorretto:17

ENV DB_URL=jdbc:mysql://mysql-db:3306/discipline_ms_db
ENV DB_USER=root
ENV DB_PASSWORD=root

COPY --from=builder /app/target/*.jar /app/app.jar

WORKDIR /app

CMD ["java", "-jar", "app.jar"]