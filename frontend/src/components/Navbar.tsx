import React from 'react';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Stack, Image, Link as ChakraLink } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/#features' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <MotionBox
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bgGradient="linear(to-r, white, blue.50)"
      boxShadow="sm"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" px={{ base: 4, md: 12 }}>
        <HStack spacing={4} alignItems="center">
          <Link to="/">
            <Image src="/logo192.png" alt="Logo" boxSize="36px" mr={2} />
          </Link>
          <Box fontWeight="bold" fontSize="xl" color="blue.700">Mini CRM</Box>
        </HStack>
        <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <ChakraLink
              as={Link}
              key={link.name}
              to={link.path}
              color={location.pathname === link.path ? 'blue.500' : 'gray.700'}
              fontWeight={location.pathname === link.path ? 'bold' : 'normal'}
              _hover={{ color: 'blue.600', textDecoration: 'none' }}
              fontSize="md"
            >
              {link.name}
            </ChakraLink>
          ))}
        </HStack>
        <Flex alignItems="center">
          <Button as={Link} to="/login" colorScheme="blue" variant="outline" size="sm" ml={4}>
            Login
          </Button>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            ml={2}
            bg="white"
          />
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link) => (
              <ChakraLink
                as={Link}
                key={link.name}
                to={link.path}
                color={location.pathname === link.path ? 'blue.500' : 'gray.700'}
                fontWeight={location.pathname === link.path ? 'bold' : 'normal'}
                _hover={{ color: 'blue.600', textDecoration: 'none' }}
                fontSize="md"
                onClick={onClose}
              >
                {link.name}
              </ChakraLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </MotionBox>
  );
};

export default Navbar;
