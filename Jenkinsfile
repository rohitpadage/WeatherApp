pipeline {
    agent any

    environment {
        // Securely load Mongo URI from Jenkins credential store
        
        APIKey= credentials('APIKey')
        MONGODB_URI= credentials('MONGODB_URI')
        PORT=3000
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

        stage('Deploy to Render') {
            steps {
                script {
                    sh "curl -X POST $RENDER_DEPLOY_HOOK"
                }
            }
        }

        
    }
}
