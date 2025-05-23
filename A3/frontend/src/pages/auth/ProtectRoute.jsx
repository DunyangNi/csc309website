import { Center, Container, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { roleToClearance } from '../../utils/utils'

function ProtectRoute({ role }) {
  const userRole = localStorage.getItem('role')

  const navigate = useNavigate()

  if (roleToClearance[userRole] < roleToClearance[role]) {
    return (
      <Container>
        <Center>
          <Stack>
            <Title fz={'120px'}>ERROR 401</Title>
            <Text> Not authorized to view this page!</Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  return <Outlet />
}

export default ProtectRoute
