import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ContactUs: React.FC = () => {
  const toast = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message sent!',
      description: 'We will get back to you soon.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      py={16}
      bgGradient="linear(to-b, white, blue.50)"
      minH="60vh"
    >
      <Container maxW="3xl">
        <VStack spacing={8} align="start">
          <Heading as="h1" size="2xl" color="blue.700">Contact Us</Heading>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <VStack spacing={4} align="start">
              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input type="text" placeholder="Enter your name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder="How can we help you?" rows={5} />
              </FormControl>
              <Button colorScheme="blue" type="submit">Send Message</Button>
            </VStack>
          </form>
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default ContactUs;
