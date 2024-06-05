"use client";
import { login } from "@/requests/authentication/login";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function AuthenticationTitle() {
  const form = useForm({
    initialValues: { email: "", password: "", rememberMe: false },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 letters" : null,
    },
  });

  return (
    <div className="div-login">
      <Container size={420} my={40}>
        <div className="text-center">
          <Title order={2}>Välkommen till</Title>
          <Title>
            <strong>Vegoboken.se!</strong>
          </Title>
          <Text mt="sm">Din digitala receptbok.</Text>
        </div>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit(async (values) => {
              await login(values);
            })}
          >
            <TextInput
              label="Email"
              placeholder="Email"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Lösenord"
              placeholder="Ange ditt lösenord"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Flex mt="sm" justify={"space-between"}>
              <Checkbox
                label="Kom ihåg mig"
                {...form.getInputProps("rememberMe")}
              />
              <Anchor<"a">
                onClick={(event) => event.preventDefault()}
                href="#"
                size="sm"
              >
                Glömt lösenordet?
              </Anchor>
            </Flex>
            <Button fullWidth mt="lg" type="submit">
              Logga in
            </Button>
            <Text size="sm" mt={5}>
              Inte medlem än?{" "}
              <Anchor<"a">
                href="#"
                size="sm"
                onClick={(event) => event.preventDefault()}
              >
                Skapa konto
              </Anchor>
            </Text>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
