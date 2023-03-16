import { Box, BubbleDialog, CloseButton, Container, WrapperTitle, Content } from "./style"
import { GrFormClose } from 'react-icons/gr';

export default function Modal ({isOpen, setIsOpen})  {

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Container isOpen={isOpen}>
        <Box>
          <Content size="unpublish">
            <CloseButton onClick={closeModal}>
              <GrFormClose size={18} />
            </CloseButton>


          ola mundo
            
          </Content>
        </Box>
      </Container>
  )
}