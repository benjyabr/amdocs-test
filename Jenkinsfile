pipeline {

  agent {
    label "main" 
  }

  stages {
    stage('Deploy App') {
     steps {
       script {
         dir('grafanachart') {
          sh "kubectl delete svc grafana-test -n grafana --ignore-not-found"   
          sh "helm uninstall grafana-test -n grafana "
          sh "helm upgrade --install --force grafana-test . -n grafana --wait"
         }
       }
     }
    }
    stage('Expose ngrok') {
     steps {
       script {
         servicePort = sh (
          script: "kubectl get --namespace grafana -o jsonpath=\"{.spec.ports[0].nodePort}\" services grafana-test",
          returnStdout: true)
         serviceIP = sh (
          script: "kubectl get nodes --namespace grafana -o jsonpath=\"{.items[0].status.addresses[0].address}\"",
          returnStdout: true)
         serviceURL = "http://${serviceIP}:${servicePort}"
         sh "PATH=$PATH:/sbin; JENKINS_NODE_COOKIE=dontkillme  ngrok http  ${serviceURL} --log=stdout > ngrok.OUT &"
        sleep time: 1000, unit: 'MILLISECONDS'
        temp = sh (
          script: "awk -F \"=\" '/https:/{print \$NF}' ngrok.OUT",
          returnStdout: true)
        if(temp){
            echo "Tunnel will be available for two hours at URL: ${temp}"
            sh "ls -alh"
        }
        else{
          echo "dfdfbgdfb ${temp}"
        }
       }
     }
    }
    
  }
}
