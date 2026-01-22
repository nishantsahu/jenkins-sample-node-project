pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-sample-node-project",
        IMAGE_TAG=${env.BUILD_NUMBER}
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker version
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }
    }
}