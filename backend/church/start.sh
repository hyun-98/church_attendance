#!/bin/bash
# backend/church 폴더로 이동
cd backend/church

# Maven 빌드 (테스트 스킵)
./mvnw clean package -DskipTests

# 빌드된 jar 실행
java -jar target/*.jar
