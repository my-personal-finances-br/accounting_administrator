## EC2 Variables
variable "ami"{}
variable "instance_type"{}
variable "ec2_name"{}

## Security Group(sg) Variables
variable "ports_allow"{
    default = [
        22,8000,3000
    ]
}