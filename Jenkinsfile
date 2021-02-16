pipeline {
    environment {
        imagename = "benjyabr/amdocstest"
        registryCredential = 'dockerhub-credentials'
        dockerImage = ''
        k8sNameSpace = "weather"
        k8sReleaseName = "benjy-weather"
  }
  agent {
      label "main" 
  }
  stages {
      stage('Test & Build') {
          steps{
              script {
                  dockerImage = docker.build(imagename, "--target prodline .")
              }
          }
      }
      stage('Publish To Dockerhub') {
          steps{
              script {
                  docker.withRegistry( '', registryCredential ) {
                  dockerImage.push("$BUILD_NUMBER")
                  dockerImage.push('latest')
                  }
              }
          }
      }
      stage('Remove Unused docker image') {
          steps{
              sh "docker rmi $imagename:$BUILD_NUMBER"
              sh "docker rmi $imagename:latest"
          }
      }
      stage('Deploy App') {
          steps {
              script {         
                  dir('chart') {
                      sh "kubectl delete svc ${k8sReleaseName} -n ${k8sNameSpace} --ignore-not-found"       
                      try{
                          sh "helm uninstall ${k8sReleaseName} -n ${k8sNameSpace} "
                      } catch (err) {
                          echo "No Release Yet, didn't uninstall"
                      }
                      sh "helm upgrade --install --force ${k8sReleaseName} . -n ${k8sNameSpace} --wait --create-namespace"
                  }
              }
          }
      }
      stage('Expose ngrok') {
          steps {
              script {
                  servicePort = sh (
                      script: "kubectl get --namespace ${k8sNameSpace} -o jsonpath=\"{.spec.ports[0].nodePort}\" services ${k8sReleaseName}",
                      returnStdout: true)
                  serviceIP = sh (
                      script: "kubectl get nodes --namespace ${k8sNameSpace} -o jsonpath=\"{.items[0].status.addresses[0].address}\"",
                      returnStdout: true)
                  serviceURL = "http://${serviceIP}:${servicePort}"
                  sh "PATH=$PATH:/sbin; JENKINS_NODE_COOKIE=dontkillme  ngrok http  ${serviceURL} --log=stdout > ngrok.OUT &"
                  sleep time: 1000, unit: 'MILLISECONDS'
                  ngrokOutput = sh (
                      script: "awk -F \"=\" '/https:/{print \$NF}' ngrok.OUT",
                      returnStdout: true)
                  if(ngrokOutput) {
                      echo "Tunnel will be available for two hours at URL: ${temp}"
                  }
                  else{
                      echo "Tunnel Failed, Check "
                  }
              }
          }
      }
  }
}
