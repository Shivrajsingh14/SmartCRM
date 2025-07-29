import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  Icon,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  HStack,
  useToast,
  Link,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthService, { LoginCredentials } from '../services/auth.service';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading, login: googleLogin, checkToken } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginMode) {
      if (!formData.name) {
        errors.name = 'Name is required';
      } else if (formData.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }

      if (formData.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLoginMode) {
        const credentials: LoginCredentials = {
          email: formData.email,
          password: formData.password
        };
        await AuthService.login(credentials);
        toast({
          title: 'Login successful!',
          description: 'Welcome back to Mini CRM Platform',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await AuthService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        toast({
          title: 'Registration successful!',
          description: 'Welcome to Mini CRM Platform',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      // Refresh the auth context
      await checkToken();
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      let errorMessage = 'An error occurred during authentication';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.map((err: any) => err.msg).join(', ');
      }

      toast({
        title: `${isLoginMode ? 'Login' : 'Registration'} failed`,
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        p={8}
        maxWidth="500px"
        width="full"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} align="center">
          <Heading as="h1" size="xl" textAlign="center">
            Mini CRM Platform
          </Heading>
          <Text color="gray.600" textAlign="center">
            {isLoginMode ? 'Sign in to your account' : 'Create your account'}
          </Text>

          {/* Google OAuth Button */}
          <Button
            w="full"
            variant="outline"
            leftIcon={<Icon as={FcGoogle} boxSize="20px" />}
            onClick={googleLogin}
            isLoading={isLoading}
            size="lg"
          >
            {isLoginMode ? 'Sign in with Google' : 'Sign up with Google'}
          </Button>

          <HStack w="full">
            <Divider />
            <Text fontSize="sm" color="gray.500" px={3}>
              OR
            </Text>
            <Divider />
          </HStack>

          {/* Email/Password Form */}
          <Box w="full">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                {!isLoginMode && (
                  <FormControl isInvalid={!!formErrors.name}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      size="lg"
                    />
                    <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                  </FormControl>
                )}

                <FormControl isInvalid={!!formErrors.email}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    size="lg"
                  />
                  <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formErrors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={isLoginMode ? "Enter your password" : "Create a password"}
                    size="lg"
                  />
                  <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                  {!isLoginMode && (
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Password must contain at least one lowercase letter, uppercase letter, and number
                    </Text>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  colorScheme="teal"
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText={isLoginMode ? 'Signing in...' : 'Creating account...'}
                >
                  {isLoginMode ? 'Sign In' : 'Create Account'}
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Switch between login and register */}
          <Text fontSize="sm" color="gray.600">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <Link
              color="teal.500"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setFormErrors({});
                setFormData({ name: '', email: '', password: '' });
              }}
              cursor="pointer"
            >
              {isLoginMode ? 'Sign up' : 'Sign in'}
            </Link>
          </Text>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            This platform is part of the Xeno SDE Internship 2025 Project
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;