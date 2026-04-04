pipeline {
    agent any

    environment {
            NEST_NOTE_APP_DB_USERNAME = credentials('NEST_NOTE_APP_DB_USERNAME')
            NEST_NOTE_APP_DB_PASSWORD = credentials('NEST_NOTE_APP_DB_PASSWORD')
        }

    stages {
		    // GitHub에서 코드 가져오기
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        // npm으로 빌드
        // Dockerfile 빌드 과정과 중복으로 생략
//        stage('Build') {
//            steps {
//                sh 'npm install'
//                sh 'npm run build'
//            }
//        }

        // 도커 이미지 생성
        // compose 파일에 빌드 설정 추가로 빌드 과정 생략
//         stage('Docker Build') {
//             steps {
//                 sh 'docker build -t note-app .'
//             }
//         }

        // 기존 컨테이너 내리고 새 컨테이너 실행
        stage('Deploy') {
            steps {
                // docker stop note-app || true 해당 컨테이너가 없으면 오류 발생. 
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }
}