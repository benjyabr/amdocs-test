pipeline {

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git url:'https://github.com/benjyabr/amdocs-test.git', branch:'master'
      }
    }
    
    stage('Deploy App') {
      steps {
        script {
          kubernetesDeploy(configs: "ben.yml", kubeconfigId: "kubeconfig")
        }
      }
    }

  }

}