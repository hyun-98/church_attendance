#!/bin/bash
# start.sh

# backend/church로 이동
cd backend/church

# 1. Gradle 빌드 (테스트 제외)
./gradlew build -x test

# 2. 빌드된 JAR 실행
java -jar build/libs/church-0.0.1-SNAPSHOT.jar
