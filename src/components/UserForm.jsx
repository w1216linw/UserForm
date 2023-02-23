import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { defaultInputs } from "../utils/defaultInputs";
import { getOccupationsAndStates } from "../utils/getOccupationAndState";
import { sendUserForm } from "../utils/sendUserForm";
import validateUser from "../utils/validateUser";

const UserForm = () => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const occupationRef = useRef();
  const stateRef = useRef();
  const [occupations, setOccupation] = useState("");
  const [states, setStates] = useState("");
  const [errors, setError] = useState(null);

  const toast = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    const user = {
      name: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      occupation: occupationRef.current.value,
      state: stateRef.current.value,
    };

    const result = validateUser(user);
    if (result?.error) {
      toast({
        title: result.error.field,
        description: result.error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const response = await sendUserForm(user);
      if (response) {
        toast({
          title: "Success",
          description: "we've received your form",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        defaultInputs([
          fullNameRef,
          emailRef,
          passwordRef,
          occupationRef,
          stateRef,
        ]);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getOccupationsAndStates();
      if (typeof data === "string") {
        setError(data);
      } else {
        setOccupation(data.occupations);
        setStates(data.states);
      }
    };
    getData();
  }, []);

  if (errors) {
    return (
      <Center w="100vw" h="100vh">
        <Grid textAlign="center">
          <Heading>Server error</Heading>
          <Text>{errors}</Text>
        </Grid>
      </Center>
    );
  }

  return (
    <Center w="100vw" h="100vh">
      <Form>

      </Form>
      <Flex
        direction="column"
        gap="1rem"
        maxW="30rem"
        w="80%"
        bg="gray.100"
        p={"2rem"}
        borderRadius="md"
      >
        <FormControl isRequired>
          <FormLabel htmlFor="fullName">Full name</FormLabel>
          <Input
            id="fullName"
            borderColor="gray.400"
            placeholder="John Doe"
            type='text'
            ref={fullNameRef}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            borderColor="gray.400"
            placeholder="john@doe.com"
            type='email'
            ref={emailRef}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              borderColor="gray.400"
              placeholder="password"
              type={isPasswordVisible ? "text" : "password"}
              ref={passwordRef}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                colorScheme="blue"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {!occupations ? null : (
          <FormControl isRequired>
            <FormLabel>Occupation</FormLabel>
            <Select name="occupation" ref={occupationRef} aria-label="occupation">
              <option value="">Select Occupation</option>
              {occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {!states ? null : (
          <FormControl isRequired>
            <FormLabel>States</FormLabel>
            <Select name="state" ref={stateRef} aria-label="state">
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.abbreviation} value={state.name}>
                  {state.name} ({state.abbreviation})
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        <Button mt="1rem" colorScheme="teal" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Flex>
    </Center>
  );
};

export default UserForm;
