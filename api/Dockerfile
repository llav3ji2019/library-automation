FROM eclipse-temurin:21.0.1_12-jre
WORKDIR /opt/app
COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
