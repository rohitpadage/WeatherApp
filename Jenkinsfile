pipeline {
    agent any

    environment {
        // Securely load Mongo URI from Jenkins credential store
        
        APIKey= credentials('APIKey')
        MONGODB_URI= credentials('MONGODB_URI')
        PORT=3000

        IMAGE_NAME = 'rohitpadage09/weather-app'
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        RENDER_DEPLOY_HOOK = credentials('render-hook')
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run ci'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps { 
                    sh 'curl -X POST "$RENDER_DEPLOY_HOOK"'
            }
        }

        
    }
}
