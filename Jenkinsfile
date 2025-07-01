pipeline {
    agent any

    environment {
        // Securely load Mongo URI from Jenkins credential store
        
        APIKey= credentials('APIKey')
        MONGODB_URI= credentials('MONGODB_URI')
        PORT=3000
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm start'
            }
        }

        
    }
}
