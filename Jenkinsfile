pipeline {

  agent main

  stages {

    stage('Checkout Source') {
      steps {
        git url:'https://github.com/benjyabr/amdocs-test.git', branch:'master'
      }
    }
    stage('Test App') {
     steps {
       script {
          sh "kubectl apply -f test-deploy.yaml -n test"    
       }
     }
    }
//    stage('Deploy App') {
//     steps {
//       script {
//          kubernetesDeploy(configs: "ben.yml", kubeconfigId: "kubeconfig")
//        }
//      }
//    }

  }

}
