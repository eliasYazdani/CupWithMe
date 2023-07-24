FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="eliasYazdani@neuefische.de"

EXPOSE 8080

ADD backend/target/CupWithMe.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]