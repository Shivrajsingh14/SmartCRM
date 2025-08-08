import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
  Link as ChakraLink,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/#features' },
  { name: 'Demo', path: '/#demo' },
  { name: 'Pricing', path: '/#pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const AnimatedNavbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  
  const bg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  );
  const borderColor = useColorModeValue('blue.200', 'blue.600');

  return (
    <MotionBox
      as="nav"
      position="fixed"
      top={0}
      zIndex={1000}
      w="full"
      bg={bg}
      backdropFilter="blur(20px)"
      borderBottom="1px"
      borderColor={borderColor}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" px={{ base: 4, md: 8 }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HStack spacing={3} alignItems="center">
            <Link to="/">
              <Image src="/logo192.png" alt="SmartCRM" boxSize="32px" />
            </Link>
            <Box
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              SmartCRM
            </Box>
          </HStack>
        </motion.div>

        {/* Desktop Navigation */}
        <HStack as="nav" spacing={8} display={{ base: 'none', lg: 'flex' }}>
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <ChakraLink
                as={Link}
                to={link.path}
                color={location.pathname === link.path ? 'blue.500' : 'gray.600'}
                fontWeight={location.pathname === link.path ? 'bold' : 'medium'}
                _hover={{ 
                  color: 'blue.500', 
                  textDecoration: 'none',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
                fontSize="sm"
              >
                {link.name}
              </ChakraLink>
            </motion.div>
          ))}
        </HStack>

        {/* Right side buttons */}
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
            _hover={{ transform: 'rotate(180deg)' }}
            transition="all 0.3s"
          />
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              as={Link}
              to="/login"
              size="sm"
              bgGradient="linear(to-r, blue.400, purple.500)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)",
                boxShadow: "0 0 20px rgba(66, 153, 225, 0.6)",
              }}
              borderRadius="full"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <IconButton
            size="sm"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
          />
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Box pb={4} display={{ lg: 'none' }}>
            <Stack as="nav" spacing={4} px={4}>
              {navLinks.map((link) => (
                <ChakraLink
                  key={link.name}
                  as={Link}
                  to={link.path}
                  color={location.pathname === link.path ? 'blue.500' : 'gray.600'}
                  fontWeight={location.pathname === link.path ? 'bold' : 'medium'}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  fontSize="md"
                  onClick={onClose}
                >
                  {link.name}
                </ChakraLink>
              ))}
            </Stack>
          </Box>
        </motion.div>
      )}
    </MotionBox>
  );
};

export default AnimatedNavbar;
