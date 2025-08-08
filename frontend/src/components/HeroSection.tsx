import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaPlay, FaRocket } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

// Floating particles animation
const FloatingParticles: React.FC = () => {
  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden" pointerEvents="none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: i % 2 === 0 ? '#4299E1' : '#9F7AEA',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
};

const HeroSection: React.FC = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, white)',
    'linear(to-br, gray.900, blue.900, purple.900)'
  );
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <MotionBox
      position="relative"
      minH="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      <FloatingParticles />
      
      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={8} align="center" textAlign="center" py={{ base: 20, md: 24 }}>
          
          {/* Main Headline */}
          <MotionHeading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="900"
            lineHeight="shorter"
            bgGradient="linear(to-r, blue.400, purple.600, pink.400)"
            bgClip="text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Revolutionize Customer
            <br />
            Relationships with AI
          </MotionHeading>

          {/* Subheading */}
          <MotionText
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            color={subTextColor}
            maxW="4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Automate, analyze, and optimize your entire sales pipeline with our AI-powered CRM.
            Transform prospects into loyal customers with intelligent automation.
          </MotionText>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HStack spacing={4} flexDirection={{ base: 'column', md: 'row' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  color="white"
                  leftIcon={<FaRocket />}
                  _hover={{
                    bgGradient: "linear(to-r, blue.500, purple.600)",
                    boxShadow: "0 0 30px rgba(66, 153, 225, 0.6)",
                    transform: "translateY(-2px)",
                  }}
                  px={8}
                  py={6}
                  fontSize="md"
                  borderRadius="full"
                  as="a"
                  href="/login"
                >
                  Start Free Trial
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="purple.400"
                  color={textColor}
                  leftIcon={<FaPlay />}
                  _hover={{
                    bg: "purple.50",
                    borderColor: "purple.500",
                    transform: "translateY(-2px)",
                  }}
                  px={8}
                  py={6}
                  fontSize="md"
                  borderRadius="full"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </HStack>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Box
              position="relative"
              maxW="800px"
              mx="auto"
              mt={12}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Box
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="2xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.200"
                  transform="perspective(1000px) rotateX(5deg)"
                >
                  <Image
                    src="/logo512.png"
                    alt="AI CRM Dashboard Preview"
                    w="full"
                    h={{ base: "200px", md: "400px" }}
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/800x400/4299E1/FFFFFF?text=AI+CRM+Dashboard"
                  />
                  
                  {/* Glowing effect */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient="linear(45deg, transparent 30%, rgba(66, 153, 225, 0.1), transparent 70%)"
                    opacity={0.7}
                    animation="shimmer 3s ease-in-out infinite"
                  />
                </Box>
              </motion.div>
            </Box>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Text fontSize="sm" color={subTextColor} mb={4}>
              Trusted by 10,000+ businesses worldwide
            </Text>
          </motion.div>
        </VStack>
      </Container>

      {/* Custom CSS for shimmer effect */}
      <Box as="style" display="none">
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </Box>
    </MotionBox>
  );
};

export default HeroSection;
