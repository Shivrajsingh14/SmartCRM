import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBrain, FaChartLine, FaRobot, FaUsers, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const MotionBox = motion(Box);

interface Feature {
  icon: any;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: FaBrain,
    title: 'Smart Lead Scoring with AI',
    description: 'Automatically identify high-value prospects with machine learning algorithms that analyze customer behavior patterns.',
    gradient: 'linear(to-br, blue.400, cyan.400)',
  },
  {
    icon: FaRobot,
    title: 'Automated Follow-ups',
    description: 'Never miss a lead again. AI-powered automation sends personalized follow-ups at the perfect moment.',
    gradient: 'linear(to-br, purple.400, pink.400)',
  },
  {
    icon: FaChartLine,
    title: 'Real-Time Sales Insights',
    description: 'Get instant analytics and predictions about your sales pipeline with beautiful, actionable dashboards.',
    gradient: 'linear(to-br, green.400, teal.400)',
  },
  {
    icon: FaUsers,
    title: 'AI Chat Assistant',
    description: 'Provide 24/7 customer support with an intelligent chatbot that learns from every interaction.',
    gradient: 'linear(to-br, orange.400, red.400)',
  },
  {
    icon: FaLightbulb,
    title: 'Predictive Analytics',
    description: 'Forecast sales trends and customer lifetime value with advanced machine learning models.',
    gradient: 'linear(to-br, yellow.400, orange.400)',
  },
  {
    icon: FaShieldAlt,
    title: 'Enterprise Security',
    description: 'Bank-level security with end-to-end encryption, GDPR compliance, and advanced access controls.',
    gradient: 'linear(to-br, gray.500, blue.600)',
  },
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        bg={cardBg}
        borderRadius="2xl"
        p={8}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="xl"
        backdropFilter="blur(20px)"
        height="full"
        position="relative"
        overflow="hidden"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        }}
        transition="all 0.3s ease"
      >
        {/* Gradient overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="4px"
          bgGradient={feature.gradient}
        />
        
        <VStack spacing={6} align="start" height="full">
          <MotionBox
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Box
              p={4}
              borderRadius="xl"
              bgGradient={feature.gradient}
              display="inline-flex"
            >
              <Icon as={feature.icon} boxSize={8} color="white" />
            </Box>
          </MotionBox>
          
          <Heading as="h3" size="lg" fontWeight="bold">
            {feature.title}
          </Heading>
          
          <Text color="gray.600" fontSize="md" lineHeight="tall">
            {feature.description}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const FeaturesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const sectionBg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box id="features" bg={sectionBg} py={20}>
      <Container maxW="7xl">
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={16}
        >
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="900"
            bgGradient="linear(to-r, blue.400, purple.600)"
            bgClip="text"
            mb={6}
          >
            Powerful AI Features
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.600"
            maxW="3xl"
            mx="auto"
          >
            Discover how our cutting-edge AI technology transforms your customer relationship management
          </Text>
        </MotionBox>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          w="full"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
