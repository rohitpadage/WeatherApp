pipeline {
    agent any

    environment {
        // Securely load Mongo URI from Jenkins credential store
        
        APIKey= credentials('APIKey')
        MONGODB_URI= credentials('MONGODB_URI')
        PORT=3000

        IMAGE_NAME = 'rohitpadage09/weather-app'
        DOCKER_USERNAME = credentials('dockerhub-username')  // Jenkins Secret Text
        DOCKER_PASSWORD = credentials('dockerhub-password')  // Jenkins Secret Text
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
        sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker push "$DOCKER_USERNAME"/weather-app:latest
        '''
    }
        }

        stage('Deploy to Render') {
            steps { 
                    sh 'curl -X POST "$RENDER_DEPLOY_HOOK"'
            }
        }

        
    }
}
