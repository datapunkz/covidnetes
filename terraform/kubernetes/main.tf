terraform {
  required_version = "~>0.12"
  backend "remote" {
    organization = "datapunks"
    workspaces {
      name = "covidnetes-k8s"
    }
  }
}

provider "kubernetes" {
}