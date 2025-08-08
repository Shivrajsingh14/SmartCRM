import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const AboutUs: React.FC = () => (
  <MotionBox
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    py={16}
    bgGradient="linear(to-b, white, blue.50)"
    minH="60vh"
  >
    <Container maxW="3xl">
      <VStack spacing={6} align="start">
        <Heading as="h1" size="2xl" color="blue.700">About Us</Heading>
        <Text fontSize="lg" color="gray.700">
          Mini CRM Platform is built for modern businesses that want to leverage AI to automate, personalize, and optimize their customer engagement. Our mission is to make advanced CRM technology accessible, intuitive, and impactful for teams of all sizes.
        </Text>
        <Text color="gray.600">
          We believe in the power of data-driven marketing, seamless automation, and beautiful user experiences. Our team is passionate about helping you grow your business with the smartest tools available.
        </Text>
        <Text color="gray.600">
          <b>Contact us:</b> support@minicrm.com
        </Text>
      </VStack>
    </Container>
  </MotionBox>
);

export default AboutUs;
