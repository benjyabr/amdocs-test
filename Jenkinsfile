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
    stage('Deploy App') {
     steps {
       script {
         dir('grafanachart') {
          sh "kubectl delete svc grafana-test -n grafana --ignore-not-found"   
          sh "helm upgrade --install --force grafana-test . -n grafana"
         }
       }
     }
    }
    stage('Expose ngrok') {
     steps {
       script {
         //def serviceIP =sh "minikube service --url grafana-test -n grafana"
         //echo "${serviceIP}"
         sh"(NODE_PORT=$(kubectl get --namespace grafana -o jsonpath=\"{.spec.ports[0].nodePort}\" services grafana-test))"
         sh "(NODE_IP=$(kubectl get nodes --namespace grafana -o jsonpath=\"{.items[0].status.addresses[0].address}\"))"
         echo http://$NODE_IP:$NODE_PORT
         sh(script: "ngrok", args: [serviceIP, "--log=ngrok.OUT", ">", "/dev/null", "&"])
         echo "Tunnel will be available for two hours at IP: "
         sh "cat ngrok.OUT | awk -F \"=\" '/https:/{print $NF}' | tail -n 1"
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

