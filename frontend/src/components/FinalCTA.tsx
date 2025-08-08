import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaRocket, FaArrowRight } from 'react-icons/fa';

const MotionBox = motion(Box);

// Animated background elements
const AnimatedBackground: React.FC = () => {
  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden">
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            background: `linear-gradient(45deg, ${i % 2 === 0 ? '#4299E1' : '#9F7AEA'}, transparent)`,
            borderRadius: i % 3 === 0 ? '50%' : '20%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: 0.1,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Neural network lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4299E1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9F7AEA" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 100 + '%'}
            y1={Math.random() * 100 + '%'}
            x2={Math.random() * 100 + '%'}
            y2={Math.random() * 100 + '%'}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </Box>
  );
};

const FinalCTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.500, purple.600, pink.500)',
    'linear(135deg, blue.600, purple.700, pink.600)'
  );

  return (
    <Box
      position="relative"
      bgGradient={bgGradient}
      py={24}
      overflow="hidden"
    >
      <AnimatedBackground />
      
      <Container maxW="5xl" position="relative" zIndex={1}>
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={8} textAlign="center" color="white">
            {/* Main CTA Heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="900"
                lineHeight="shorter"
                textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              >
                Supercharge Your CRM
                <br />
                with AI Today
              </Heading>
            </motion.div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                maxW="3xl"
                opacity={0.9}
                textShadow="1px 1px 2px rgba(0,0,0,0.3)"
              >
                Join thousands of businesses that have transformed their customer relationships 
                with our AI-powered CRM. Start your free trial today and experience the future 
                of customer management.
              </Text>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <HStack
                spacing={8}
                justify="center"
                flexWrap="wrap"
                opacity={0.9}
              >
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">10K+</Text>
                  <Text fontSize="sm">Happy Customers</Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">500M+</Text>
                  <Text fontSize="sm">Leads Processed</Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">99.9%</Text>
                  <Text fontSize="sm">Uptime</Text>
                </VStack>
              </HStack>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <VStack spacing={4}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    bg="white"
                    color="purple.600"
                    leftIcon={<FaRocket />}
                    rightIcon={<FaArrowRight />}
                    _hover={{
                      bg: "gray.50",
                      transform: "translateY(-2px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                    px={10}
                    py={6}
                    fontSize="lg"
                    fontWeight="bold"
                    borderRadius="full"
                    boxShadow="0 10px 30px rgba(0,0,0,0.2)"
                    as="a"
                    href="/login"
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
                
                <Text fontSize="sm" opacity={0.8}>
                  No credit card required • Free 14-day trial • Cancel anytime
                </Text>
              </VStack>
            </motion.div>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default FinalCTA;
