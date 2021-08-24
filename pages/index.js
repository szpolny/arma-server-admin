import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import fetch from 'node-fetch';

import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import AuthContext from '../context/authContext';
import LoginForm from '../components/LoginForm';

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    if (user.isLoggedIn) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { username, password };

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.username) {
      setUser({
        isLoggedIn: true,
        username: data.username,
      });
    }
  };

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{
        base: '4',
        lg: '8',
      }}
    >
      <Head>
        <title>Arma 3 Server</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Arma 3 Server
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Login to your admin panel</Text>
        </Text>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py="8"
          px={{
            base: '4',
            md: '10',
          }}
          shadow="base"
          rounded={{
            sm: 'lg',
          }}
        >
          <LoginForm
            handleSubmit={handleSubmit}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Box>
      </Box>
    </Box>
  );
}