import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config/config.index";
import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Stack,
  Text,
} from "@mantine/core";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const newUser = { username, email, password };

    try {
      const response = await axios.post(`${BASE_URL}users/register`, newUser);
      console.log("new user: ", response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      size="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
        Welcome to HappyCMS
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        {"Join our community and explore new contents and articles."}
      </p>
      <Paper shadow="xs" style={{ width: "500px", padding: "50px" }}>
        <form onSubmit={handleLogin}>
          <Stack spacing="lg">
            <TextInput
              required
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextInput
              required
              type="email"
              label="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <PasswordInput
              required
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" fullWidth>
              Signup
            </Button>
          </Stack>
        </form>
        <Text align="center" style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#002147",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            {"login here"}
          </Link>
        </Text>
        <Text align="center" style={{ marginTop: "1rem", fontSize: "14px" }}>
          {"By continuing, you agree to"}
          <Link
            to="#"
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            {"Terms"}
          </Link>
          {" and "}
          <Link
            to="#"
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            {"Privacy Policy"}
          </Link>
        </Text>
      </Paper>
    </Container>
  );
}
export default Signup;
