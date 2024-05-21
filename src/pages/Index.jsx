import { Container, VStack, Heading, Text, Box, Button, RadioGroup, Radio, Stack, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [membershipType, setMembershipType] = useState("yearly");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission and payment processing
    console.log("User Info:", userInfo);
    console.log("Membership Type:", membershipType);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="2xl" textAlign="center">
          Join Stockholm Makerspace
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Choose your membership type and fill in your details to join us!
        </Text>
        <Box width="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>
            Membership Options
          </Heading>
          <RadioGroup onChange={setMembershipType} value={membershipType}>
            <Stack direction="column" spacing={4}>
              <Radio value="yearly">
                <Box>
                  <Text fontWeight="bold">Yearly Membership</Text>
                  <Text>Access to all facilities and events for a year.</Text>
                </Box>
              </Radio>
              <Radio value="monthly">
                <Box>
                  <Text fontWeight="bold">Monthly Membership</Text>
                  <Text>Access to all facilities and events for a month.</Text>
                </Box>
              </Radio>
              <Radio value="support">
                <Box>
                  <Text fontWeight="bold">Support Membership</Text>
                  <Text>Support us and get occasional access to events.</Text>
                </Box>
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box width="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>
            Your Information
          </Heading>
          <VStack spacing={4} width="100%">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </Box>
        <Button colorScheme="blue" size="lg" onClick={handleSubmit}>
          Proceed to Payment
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;