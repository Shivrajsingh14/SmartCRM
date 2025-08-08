import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaUserPlus,
  FaChartLine,
  FaRobot,
  FaBullseye,
  FaCog,
  FaRocket,
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  details: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up & Setup",
    description: "Create your account and import your existing customer data seamlessly",
    icon: FaUserPlus,
    color: "blue",
    details: [
      "Quick 5-minute setup process",
      "Import data from any CRM",
      "No technical knowledge required"
    ]
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Our AI analyzes your customer data to identify patterns and opportunities",
    icon: FaRobot,
    color: "purple",
    details: [
      "Advanced pattern recognition",
      "Customer behavior analysis",
      "Predictive insights generation"
    ]
  },
  {
    id: 3,
    title: "Smart Targeting",
    description: "Get AI-powered recommendations for the best customers to target",
    icon: FaBullseye,
    color: "pink",
    details: [
      "Lead scoring automation",
      "Personalized messaging",
      "Optimal timing suggestions"
    ]
  },
  {
    id: 4,
    title: "Automated Workflows",
    description: "Set up automated campaigns and follow-ups based on AI insights",
    icon: FaCog,
    color: "orange",
    details: [
      "Smart email sequences",
      "Task automation",
      "Follow-up reminders"
    ]
  },
  {
    id: 5,
    title: "Track Performance",
    description: "Monitor your results with real-time analytics and reporting",
    icon: FaChartLine,
    color: "green",
    details: [
      "Real-time dashboards",
      "Conversion tracking",
      "ROI measurement"
    ]
  },
  {
    id: 6,
    title: "Scale & Optimize",
    description: "Continuously improve with AI-driven optimization suggestions",
    icon: FaRocket,
    color: "cyan",
    details: [
      "Performance optimization",
      "Scaling recommendations",
      "Continuous improvement"
    ]
  }
];

const StepCard: React.FC<{ step: Step; index: number; isLast: boolean }> = ({
  step,
  index,
  isLast
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const detailTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box position="relative">
      {/* Connection Line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '100%',
            width: '2px',
            height: '60px',
            background: `linear-gradient(180deg, var(--chakra-colors-${step.color}-400), var(--chakra-colors-${step.color}-200))`,
            transformOrigin: 'top',
            zIndex: 1,
          }}
        />
      )}

      <MotionCard
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 50, scale: 0.9 }
        }
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{
          y: -5,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 }
        }}
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgGradient: `linear(to-r, ${step.color}.400, ${step.color}.600)`,
        }}
      >
        <CardBody p={8}>
          <VStack spacing={6} align="center" textAlign="center">
            {/* Step Number */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            >
              <Box
                position="relative"
                w={20}
                h={20}
                borderRadius="full"
                bgGradient={`linear(135deg, ${step.color}.400, ${step.color}.600)`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="xl"
                fontWeight="bold"
                boxShadow="0 10px 25px rgba(0,0,0,0.2)"
              >
                <Box
                  position="absolute"
                  top={-2}
                  right={-2}
                  w={6}
                  h={6}
                  bg="white"
                  color={`${step.color}.600`}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="bold"
                  boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                >
                  {step.id}
                </Box>
                <Icon as={step.icon} boxSize={8} />
              </Box>
            </motion.div>

            {/* Content */}
            <VStack spacing={4} align="center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              >
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="bold"
                  color={`${step.color}.600`}
                  mb={2}
                >
                  {step.title}
                </Heading>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              >
                <Text
                  color={useColorModeValue('gray.600', 'gray.300')}
                  lineHeight="tall"
                  mb={4}
                >
                  {step.description}
                </Text>
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
              >
                <VStack spacing={2} align="start" w="full">
                  {step.details.map((detail, i) => (
                    <HStack key={i} spacing={3} align="start">
                      <Box
                        w={2}
                        h={2}
                        bg={`${step.color}.400`}
                        borderRadius="full"
                        mt={2}
                        flexShrink={0}
                      />
                      <Text
                        fontSize="sm"
                        color={detailTextColor}
                      >
                        {detail}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </motion.div>
            </VStack>
          </VStack>
        </CardBody>
      </MotionCard>
    </Box>
  );
};

const HowItWorksSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const sectionBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={sectionBg} py={20} position="relative" overflow="hidden">
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 50h100M50 0v100M25 25h50v50h-50z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </Box>

      <Container maxW="6xl" position="relative" zIndex={1}>
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
          mb={16}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="900"
              bgGradient="linear(135deg, blue.600, purple.600)"
              bgClip="text"
              mb={4}
            >
              How It Works
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW="3xl"
              mx="auto"
            >
              Get started with our AI-powered CRM in 6 simple steps. 
              From setup to success, we'll guide you every step of the way.
            </Text>
          </motion.div>
        </MotionBox>

        {/* Steps Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 12, md: 8 }}
            maxW="5xl"
            mx="auto"
          >
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </SimpleGrid>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <VStack spacing={4} mt={16} textAlign="center">
            <Heading
              as="h3"
              fontSize="2xl"
              color={useColorModeValue('gray.800', 'white')}
            >
              Ready to get started?
            </Heading>
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize="lg"
            >
              Join thousands of businesses already using our AI-powered CRM
            </Text>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
