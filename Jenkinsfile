pipeline {
    agent any

    environment {
        // Securely load Mongo URI from Jenkins credential store
        
        APIKey= credentials('APIKey')
        MONGODB_URI= credentials('MONGODB_URI')
        PORT=3000

        IMAGE_NAME = 'smart-weather-app'
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
                    def imageTag = "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
                    docker.build(imageTag)
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
        sh '''
            def imageTag = "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
            echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
            docker push ${imageTag}
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
