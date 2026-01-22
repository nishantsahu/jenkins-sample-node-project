pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "nishantkumarsahu"
        IMAGE_NAME = "jenkins-sample-node-project"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        FULL_IMAGE = "${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
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
                    docker build -t ${FULL_IMAGE} .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push ${FULL_IMAGE}'
            }
        }
    }
}