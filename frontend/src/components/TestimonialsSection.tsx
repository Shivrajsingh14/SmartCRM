import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
  Stack,
  Card,
  CardBody,
  Badge,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

interface TestimonialData {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  testimonial: string;
  industry: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "VP of Sales",
    company: "TechCorp Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    testimonial: "This AI-powered CRM has revolutionized our sales process. We've seen a 300% increase in lead conversion rates and our team is more productive than ever.",
    industry: "Technology"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director",
    company: "Growth Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    testimonial: "The AI insights have helped us identify patterns we never saw before. Customer satisfaction is up 45% since we started using this platform.",
    industry: "Marketing"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Customer Success Manager",
    company: "ServicePro",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    testimonial: "The automated workflows and predictive analytics have saved us countless hours. We can now focus on building relationships instead of managing data.",
    industry: "Service"
  },
  {
    id: 4,
    name: "David Thompson",
    position: "CEO",
    company: "InnovateLabs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    testimonial: "This CRM doesn't just manage our customers - it predicts their needs. The ROI has been incredible, paying for itself within the first month.",
    industry: "Innovation"
  },
  {
    id: 5,
    name: "Lisa Park",
    position: "Sales Manager",
    company: "Digital Dynamics",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    testimonial: "The AI recommendations are spot-on. We're closing deals faster and our customer lifetime value has increased by 200%.",
    industry: "Digital"
  },
  {
    id: 6,
    name: "James Wilson",
    position: "Head of Operations",
    company: "ScaleUp Co.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    testimonial: "Implementing this CRM was the best decision we made this year. The team adoption was seamless and results were immediate.",
    industry: "Operations"
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <FaStar
            size={16}
            color={i < rating ? "#FFD700" : "#E2E8F0"}
          />
        </motion.div>
      ))}
    </HStack>
  );
};

const TestimonialCard: React.FC<{ testimonial: TestimonialData; index: number }> = ({
  testimonial,
  index
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const quoteBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <MotionCard
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateY: 0 }
          : { opacity: 0, y: 50, rotateY: -10 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 }
      }}
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgGradient: 'linear(to-r, blue.400, purple.500, pink.400)',
      }}
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          {/* Quote Icon */}
          <Box
            alignSelf="flex-start"
            p={2}
            bg={quoteBg}
            borderRadius="full"
            color="blue.500"
          >
            <FaQuoteLeft size={16} />
          </Box>

          {/* Testimonial Text */}
          <Text
            fontSize="md"
            lineHeight="tall"
            color={useColorModeValue('gray.700', 'gray.300')}
            fontStyle="italic"
          >
            "{testimonial.testimonial}"
          </Text>

          {/* Rating */}
          <StarRating rating={testimonial.rating} />

          {/* Author Info */}
          <HStack spacing={4} pt={2}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar
                src={testimonial.avatar}
                name={testimonial.name}
                size="md"
                border="3px solid"
                borderColor={useColorModeValue('blue.100', 'blue.800')}
              />
            </motion.div>
            
            <VStack align="start" spacing={0} flex={1}>
              <Text fontWeight="bold" fontSize="sm">
                {testimonial.name}
              </Text>
              <Text
                fontSize="xs"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                {testimonial.position}
              </Text>
              <Text
                fontSize="xs"
                color={useColorModeValue('blue.600', 'blue.400')}
                fontWeight="medium"
              >
                {testimonial.company}
              </Text>
            </VStack>
            
            <Badge
              colorScheme="blue"
              variant="subtle"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
            >
              {testimonial.industry}
            </Badge>
          </HStack>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

const TestimonialsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const sectionBg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={sectionBg} py={20} position="relative" overflow="hidden">
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
        bgImage="radial-gradient(circle at 25% 25%, blue.500 2px, transparent 2px)"
        bgSize="60px 60px"
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
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
              What Our Customers Say
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
              Join thousands of satisfied customers who have transformed their business 
              with our AI-powered CRM solution.
            </Text>
          </motion.div>
        </MotionBox>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={8}
            align="stretch"
          >
            {/* Left Column */}
            <VStack spacing={8} flex={1}>
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </VStack>

            {/* Right Column */}
            <VStack spacing={8} flex={1} mt={{ base: 0, lg: 12 }}>
              {testimonials.slice(3, 6).map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index + 3}
                />
              ))}
            </VStack>
          </Stack>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <HStack
            justify="center"
            spacing={12}
            mt={16}
            flexWrap="wrap"
            textAlign="center"
          >
            <VStack spacing={1}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                bgGradient="linear(135deg, blue.600, purple.600)"
                bgClip="text"
              >
                4.9/5
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Average Rating
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                bgGradient="linear(135deg, blue.600, purple.600)"
                bgClip="text"
              >
                98%
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Customer Satisfaction
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                bgGradient="linear(135deg, blue.600, purple.600)"
                bgClip="text"
              >
                24/7
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Support Available
              </Text>
            </VStack>
          </HStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
