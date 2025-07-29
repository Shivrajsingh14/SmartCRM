import React, { Component, ReactNode } from 'react';
import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    // Clear the error state and reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <Center height="100vh" bg="gray.50">
          <Box p={8} maxWidth="500px" textAlign="center">
            <VStack spacing={4}>
              <Heading as="h2" size="lg" color="red.500">
                Oops! Something went wrong
              </Heading>
              <Text color="gray.600">
                There was an error loading the application. This might be due to a network issue or temporary loading problem.
              </Text>
              <Text fontSize="sm" color="gray.500">
                Error: {this.state.error?.message || 'Unknown error'}
              </Text>
              <Button colorScheme="teal" onClick={this.handleReload}>
                Reload Page
              </Button>
            </VStack>
          </Box>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
