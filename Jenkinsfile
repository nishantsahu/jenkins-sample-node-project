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

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        set +x
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        set -x
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push ${FULL_IMAGE} || docker push ${FULL_IMAGE}'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f deployment.yaml
                    kubectl apply -f service.yaml
                    kubectl rollout restart deployment node-app
                '''
            }
        }
    }

    post {
        success {
            echo "Docker image pushed successfully: ${FULL_IMAGE}"
        }
        failure {
            echo "Pipeline failed"
        }
        always {
            sh "docker logout || true"
        }
    }
}