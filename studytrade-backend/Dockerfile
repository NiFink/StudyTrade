# Use an official OpenJDK runtime as a parent image
FROM maven:3-eclipse-temurin-17

# Set the working directory in the container
WORKDIR /app

COPY src ./src

COPY pom.xml ./pom.xml

ARG JAR_FILE=target/*.jar

# Copy the Spring Boot jar to the container
# COPY ./target/studytrade-backend.jar /app.jar

RUN mvn package -DskipTests

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "./target/studytrade-backend.jar"]