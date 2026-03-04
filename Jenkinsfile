pipeline{
    agent any
    environment {
        SSH_SERVER = credentials('ssh-server')
        SSH_KEY_CREDENTIALS_ID = 'prod-server-key'
        DEPLOY_PATH = credentials('deployment-prod')
    }
    stages{
        

        stage("Build"){
            steps{
                sh """
                    sed -i "s|url: '.*'|url: 'http://api.deploy.local.exo.be/'|" src/environments/environment.ts
                    
                """
                sh 'cat src/environments/environment.ts # Pour vérifier la structure dans les logs Jenkins'
                sh 'docker image rm -f deployment-front || true'
                sh 'rm -f ./deployment-front.tar || true'
                sh "docker build -t deployment-front ."
                sh 'docker save deployment-front -o ./deployment-front.tar'
            }

        }

        stage("Deploy"){
            steps{
                sshagent([env.SSH_KEY_CREDENTIALS_ID]) {
                    sh '''
                        scp ./deployment-front.tar $SSH_SERVER:$DEPLOY_PATH/
                        ssh $SSH_SERVER "
                            cd $DEPLOY_PATH
                            docker load -i deployment-front.tar
                            docker compose stop front || true
                            docker compose rm front || true
                            docker compose up front -d
                            rm -f deployment-front.tar
                        "
                    '''
                }
            }
        }

        stage("Clean up"){
            steps{
                sh 'rm -f ./deployment-front.tar'
                sh 'docker image rm -f deployment-front || true'
            }
        }
        
    }
   
}