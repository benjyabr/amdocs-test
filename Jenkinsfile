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
         servicePort = sh (
          script: "kubectl get --namespace grafana -o jsonpath=\"{.spec.ports[0].nodePort}\" services grafana-test",
          returnStdout: true)
         serviceIP = sh (
          script: "kubectl get nodes --namespace grafana -o jsonpath=\"{.items[0].status.addresses[0].address}\"",
          returnStdout: true)
         //servicePort =sh "kubectl get --namespace grafana -o jsonpath=\"{.spec.ports[0].nodePort}\" services grafana-test"
//         serviceIP =sh "kubectl get nodes --namespace grafana -o jsonpath=\"{.items[0].status.addresses[0].address}\""
         serviceURL = "http://${serviceIP}:${servicePort}"
         echo serviceURL
         //sh(script: "ngrok", args: [serviceURL, "--log=ngrok.OUT", ">", "/dev/null", "&"])
         sh "ngrok http ${serviceURL} --log=ngrok.OUT > /dev/null &"
         //echo "Tunnel will be available for two hours at IP: "
         //sh "cat ngrok.OUT | awk -F \"=\" '/https:/{print $NF}' | tail -n 1"
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

