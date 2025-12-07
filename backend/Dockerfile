# Etapa de build usando Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copia SOMENTE o backend, não o repo inteiro
COPY backend/. .

RUN mvn -e -B -DskipTests package

# ---------------------------
# Etapa final
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
