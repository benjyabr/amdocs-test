pipeline {

  agent {
    label "main" 
  }

  stages {

    stage('Checkout Source') {
      steps {
        git url:'https://github.com/benjyabr/amdocs-test.git', branch:'master'
      }
    }
    stage('Test App') {
     steps {
       script {
         dir('chart') {
          sh "kubectl delete svc benjy-amdocs-app-benchart -n jenkins --ignore-not-found"   
          sh "helm upgrade --install --force benjy-amdocs-app ."
          sh "" 
         }
          
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
