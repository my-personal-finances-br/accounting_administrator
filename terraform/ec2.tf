resource "aws_instance" "ec2_instance" {
  ami             = "ami-0c7217cdde317cfec"  # Ubuntu20.04
  instance_type   = "t2.micro"  # Free tier
  subnet_id       = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.instance_sg.id]
  associate_public_ip_address = true
  key_name = "accountingAdmKey"
  tags = {
    Name = "my-instance"
  }
  root_block_device {
    volume_size = 30  
    volume_type = "gp2"  
  }
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              curl -fsSL https://get.docker.com/ | sudo bash
              sudo usermod -aG docker $USER
              git clone https://lucasehonda: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@github.com/my-personal-finances-br/accounting_administrator.git
              # Add more commands as needed
              EOF
}