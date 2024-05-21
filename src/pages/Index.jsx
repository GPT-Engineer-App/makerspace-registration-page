import { Container, VStack, Heading, Text, Box, Button, Stack, Input, FormControl, FormLabel, SimpleGrid, Card, CardHeader, CardBody, CardFooter, List, ListItem, ListIcon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";

const Index = () => {
  const [membershipType, setMembershipType] = useState("yearly");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [showFireworks, setShowFireworks] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onOpen();
  };

  const membershipOptions = [
    {
      type: "yearly",
      title: "Yearly Membership",
      description: "Access to all facilities and events for a year.",
      features: [
        { text: "Access to all facilities", available: true },
        { text: "Free entry to events", available: true },
        { text: "Priority support", available: true },
      ],
    },
    {
      type: "monthly",
      title: "Monthly Membership",
      description: "Access to all facilities and events for a month.",
      features: [
        { text: "Access to all facilities", available: true },
        { text: "Free entry to events", available: true },
        { text: "Priority support", available: false },
      ],
    },
    {
      type: "support",
      title: "Support Membership",
      description: "Support us and get occasional access to events.",
      features: [
        { text: "Access to all facilities", available: false },
        { text: "Free entry to events", available: true },
        { text: "Priority support", available: false },
      ],
    },
  ];

  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] !== "" || checkWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = checkWinner(newBoard);
    if (winner) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000); // Fireworks for 5 seconds
    }
  };

  const FireworksCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const particles = [];

      const createParticle = (x, y) => {
        const particle = {
          x,
          y,
          size: Math.random() * 5 + 1,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        };
        particles.push(particle);
      };

      const updateParticles = () => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.size *= 0.95;
          if (p.size < 0.5) {
            particles.splice(i, 1);
            i--;
          }
        }
      };

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      };

      const animate = () => {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
      };

      const handleClick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        for (let i = 0; i < 100; i++) {
          createParticle(x, y);
        }
      };

      canvas.addEventListener("click", handleClick);
      animate();

      return () => {
        canvas.removeEventListener("click", handleClick);
      };
    }, []);

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }} />;
  };

  return (
    <Container centerContent maxW="container.lg" py={10}>
      {showFireworks && <FireworksCanvas />}
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="2xl" textAlign="center">
          Join Stockholm Makerspace
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Choose your membership type and fill in your details to join us!
        </Text>
        <Box width="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Membership Options
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {membershipOptions.map((option) => (
              <Card
                key={option.type}
                onClick={() => setMembershipType(option.type)}
                borderWidth={membershipType === option.type ? "2px" : "1px"}
                borderColor={membershipType === option.type ? "blue.500" : "gray.200"}
                cursor="pointer"
              >
                <CardHeader>
                  <Text fontSize="2xl" fontWeight="bold">
                    {option.title}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text mb={4}>{option.description}</Text>
                  <List spacing={2}>
                    {option.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListIcon as={feature.available ? FaCheckCircle : FaTimesCircle} color={feature.available ? "green.500" : "red.500"} />
                        {feature.text}
                      </ListItem>
                    ))}
                  </List>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
        <Box width="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tic Tac Toe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <SimpleGrid columns={3} spacing={2}>
                {Array(9).fill("").map((_, index) => (
                  <Box key={index} borderWidth="1px" borderRadius="md" height="100px" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" onClick={() => handleCellClick(index)}>
                    {board[index]}
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;