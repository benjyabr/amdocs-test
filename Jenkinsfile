pipeline {
  environment {
      imagename = "benjyabr/amdocstest"
      registryCredential = 'dockerhub-credentials'
      dockerImage = ''
  }
  agent {
    label "main" 
  }

  stages {
    stage('Build') {
      steps{
        script {
      dockerImage = docker.build imagename
      //app = docker.build("benjyabr/amdocstest:${env.BUILD_NUMBER}")
      //app.tag(["benjyabr/amdocstest","latest"])
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
          sh "kubectl delete svc benjy-weather -n weather --ignore-not-found"   
          sh "helm uninstall benjy-weather -n weather "
          sh "helm upgrade --install --force benjy-weather . -n weather --wait"
         }
       }
     }
  }
  //stage('Deploy App') {
  //   steps {
  //     script {
  //       dir('grafanachart') {
  //        sh "kubectl delete svc grafana-test -n grafana --ignore-not-found"   
  //        sh "helm uninstall grafana-test -n grafana "
  //        sh "helm upgrade --install --force grafana-test . -n grafana --wait"
  //       }
  //     }
  //   }
 // }
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
        }
        else{
          echo "Tunnel Failed, Check "
        }
       }
     }
    }
    
  }
}
