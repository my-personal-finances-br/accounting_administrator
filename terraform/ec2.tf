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
}