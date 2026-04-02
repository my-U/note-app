pipeline {
    agent any

    stages {
		    // GitHub에서 코드 가져오기
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        // npm으로 빌드
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        // 도커 이미지 생성
        stage('Docker Build') {
            steps {
                sh 'docker build -t note-app .'
            }
        }

        // 기존 컨테이너 내리고 새 컨테이너 실행
        stage('Deploy') {
            steps {
                sh 'docker stop note-app || true'
                sh 'docker rm note-app || true'
                sh 'docker run -d --name note-app -p 3000:3000 note-app'
            }
        }
    }
}