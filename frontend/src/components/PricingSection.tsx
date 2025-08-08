import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaCheck, FaStar } from 'react-icons/fa';

const MotionBox = motion(Box);

interface PricingTier {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  isPopular?: boolean;
  gradient: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for small teams getting started with AI CRM',
    features: [
      'Up to 1,000 contacts',
      'Basic AI lead scoring',
      'Email automation',
      'Standard reporting',
      'Email support',
    ],
    gradient: 'linear(to-br, blue.400, cyan.400)',
  },
  {
    name: 'Professional',
    price: { monthly: 79, yearly: 790 },
    description: 'Advanced features for growing businesses',
    features: [
      'Up to 10,000 contacts',
      'Advanced AI analytics',
      'Multi-channel automation',
      'Custom dashboards',
      'Priority support',
      'API access',
      'Advanced integrations',
    ],
    isPopular: true,
    gradient: 'linear(to-br, purple.400, pink.400)',
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, yearly: 1990 },
    description: 'Complete solution for large organizations',
    features: [
      'Unlimited contacts',
      'Custom AI models',
      'White-label options',
      'Advanced security',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment',
    ],
    gradient: 'linear(to-br, orange.400, red.400)',
  },
];

const PricingCard: React.FC<{ tier: PricingTier; isYearly: boolean; index: number }> = ({ 
  tier, 
  isYearly, 
  index 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const price = isYearly ? tier.price.yearly : tier.price.monthly;
  const originalPrice = isYearly ? tier.price.yearly * 12 / 10 : tier.price.monthly;
  const savings = isYearly ? Math.round(((originalPrice * 12 - tier.price.yearly) / (originalPrice * 12)) * 100) : 0;

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -10 }}
    >
      <Box
        position="relative"
        bg={cardBg}
        borderRadius="2xl"
        p={8}
        border="2px solid"
        borderColor={tier.isPopular ? 'purple.400' : borderColor}
        boxShadow={tier.isPopular ? '0 20px 40px rgba(128, 90, 213, 0.2)' : 'xl'}
        height="full"
        overflow="hidden"
      >
        {tier.isPopular && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            bgGradient={tier.gradient}
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
          >
            <FaStar style={{ display: 'inline', marginRight: '4px' }} />
            Most Popular
          </Badge>
        )}

        <VStack spacing={6} align="start" height="full">
          {/* Header */}
          <VStack spacing={3} align="start" w="full">
            <Heading as="h3" size="lg" fontWeight="bold">
              {tier.name}
            </Heading>
            <Text color="gray.600" fontSize="md">
              {tier.description}
            </Text>
          </VStack>

          {/* Price */}
          <VStack spacing={2} align="start">
            <HStack>
              <Heading as="h4" fontSize="4xl" fontWeight="900">
                ${price}
              </Heading>
              <VStack spacing={0} align="start">
                <Text color="gray.600" fontSize="sm">
                  /{isYearly ? 'year' : 'month'}
                </Text>
                {isYearly && savings > 0 && (
                  <Text color="green.500" fontSize="xs" fontWeight="bold">
                    Save {savings}%
                  </Text>
                )}
              </VStack>
            </HStack>
            {isYearly && (
              <Text color="gray.500" fontSize="sm" textDecoration="line-through">
                ${Math.round(originalPrice * 12)}/year
              </Text>
            )}
          </VStack>

          {/* Features */}
          <List spacing={3} w="full" flex={1}>
            {tier.features.map((feature, featureIndex) => (
              <ListItem key={featureIndex} display="flex" alignItems="center">
                <ListIcon 
                  as={FaCheck} 
                  color="green.500" 
                  minW="16px"
                  h="16px"
                />
                <Text fontSize="sm">{feature}</Text>
              </ListItem>
            ))}
          </List>

          {/* CTA Button */}
          <MotionBox w="full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              w="full"
              bgGradient={tier.isPopular ? tier.gradient : 'linear(to-r, gray.600, gray.700)'}
              color="white"
              _hover={{
                bgGradient: tier.isPopular ? 
                  'linear(to-r, purple.500, pink.500)' : 
                  'linear(to-r, gray.700, gray.800)',
                boxShadow: tier.isPopular ? 
                  '0 0 30px rgba(128, 90, 213, 0.6)' : 
                  '0 0 20px rgba(0, 0, 0, 0.3)',
              }}
              borderRadius="xl"
              as="a"
              href="/login"
            >
              Get Started
            </Button>
          </MotionBox>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const sectionBg = useColorModeValue('white', 'gray.800');

  return (
    <Box id="pricing" bg={sectionBg} py={20}>
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
            Choose Your Plan
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.600"
            maxW="3xl"
            mx="auto"
            mb={8}
          >
            Start with a free trial. Upgrade anytime. No hidden fees.
          </Text>

          {/* Billing Toggle */}
          <FormControl display="flex" alignItems="center" justifyContent="center">
            <FormLabel htmlFor="billing-toggle" mb="0" fontSize="lg">
              Monthly
            </FormLabel>
            <Switch
              id="billing-toggle"
              size="lg"
              colorScheme="purple"
              isChecked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
              mx={4}
            />
            <FormLabel htmlFor="billing-toggle" mb="0" fontSize="lg">
              Yearly
              <Badge ml={2} colorScheme="green" fontSize="xs">
                Save 20%
              </Badge>
            </FormLabel>
          </FormControl>
        </MotionBox>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={8}
          w="full"
        >
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} isYearly={isYearly} index={index} />
          ))}
        </SimpleGrid>

        {/* Money-back guarantee */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          textAlign="center"
          mt={12}
        >
          <Text color="gray.600" fontSize="sm">
            🛡️ 30-day money-back guarantee • 🚀 Free migration assistance • 📞 24/7 support
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default PricingSection;
