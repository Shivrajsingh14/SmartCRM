import React from 'react';
import { Box, Container, Flex, HStack, Text, Button, IconButton, Link as ChakraLink } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Footer: React.FC = () => {
  return (
    <MotionBox
      as="footer"
      bgGradient="linear(to-r, blue.50, white)"
      py={8}
      borderTop="1px solid"
      borderColor="blue.100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Container maxW="6xl">
        <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>
          <Text color="blue.700" fontWeight="bold">Mini CRM Platform © {new Date().getFullYear()}</Text>
          <HStack spacing={6} mt={{ base: 4, md: 0 }}>
            <Button as={Link} to="/about" variant="link" colorScheme="blue">About Us</Button>
            <Button as={Link} to="/contact" variant="link" colorScheme="blue">Contact</Button>
            <Button as={Link} to="/login" variant="link" colorScheme="blue">Login</Button>
            <ChakraLink href="https://github.com/" isExternal>
              <IconButton aria-label="GitHub" icon={<FaGithub />} variant="ghost" colorScheme="blue" />
            </ChakraLink>
            <ChakraLink href="https://linkedin.com/" isExternal>
              <IconButton aria-label="LinkedIn" icon={<FaLinkedin />} variant="ghost" colorScheme="blue" />
            </ChakraLink>
            <ChakraLink href="https://twitter.com/" isExternal>
              <IconButton aria-label="Twitter" icon={<FaTwitter />} variant="ghost" colorScheme="blue" />
            </ChakraLink>
          </HStack>
        </Flex>
      </Container>
    </MotionBox>
  );
};

export default Footer;
