# ----------------------------
# 1) BUILDER — compila o projeto
# ----------------------------
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o pom.xml e baixa dependências antes do resto (cache eficiente)
COPY pom.xml .
RUN mvn -e -B dependency:go-offline

# Copia o restante do código
COPY src ./src

# Compila o projeto e gera o .jar
RUN mvn -e -B -DskipTests package


# ----------------------------
# 2) RUNTIME — imagem final leve
# ----------------------------
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copia o artifact gerado pelo stage anterior
COPY --from=build /app/target/*.jar app.jar

# A porta é definida automaticamente pelo Render (variável $PORT)
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
