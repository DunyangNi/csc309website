import React from 'react'

import {
  Stack,
  Title,
  Flex,
  Card,
  Button,
  ActionIcon,
  Tooltip,
  Modal,
  SimpleGrid,
  Tabs,
  Box,
  TextInput,
  Divider,
  useMantineTheme,
  getGradient,
} from '@mantine/core'
import { useLocation, useNavigate } from 'react-router'
import { roleToClearance } from '../../utils/utils'
import {
  IconCalendar,
  IconCashRegister,
  IconCreditCard,
  IconDashboard,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconTags,
  IconTicket,
  IconUser,
} from '@tabler/icons-react'
import Settings from './components/Settings'
import { useDisclosure } from '@mantine/hooks'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [opened, { open, close }] = useDisclosure()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    localStorage.removeItem('userid')
    navigate('/login')
  }

  const role = localStorage.getItem('role')
  const clearance = roleToClearance[role]

  const theme = useMantineTheme()

  const clearanceToLinks = {
    1: [
      {
        label: 'Dashboard',
        to: '/regular',
        icon: <IconLayoutDashboard />,
      },
      {
        label: 'Event Organizer',
        to: '/event-organizer',
        icon: <IconCalendar />,
      },
    ],
    2: [
      {
        label: 'Dashboard',
        to: '/cashier',
        icon: <IconLayoutDashboard />,
      },
      {
        label: 'Regular User Dashboard',
        to: '/regular',
        icon: <IconUser />,
      },
      {
        label: 'Event Organizer',
        to: '/event-organizer',
        icon: <IconCalendar />,
      },
    ],

    3: [
      {
        label: 'Dashboard',
        to: '/manager',
        icon: <IconLayoutDashboard />,
      },
      {
        label: 'Cashier Dashboard',
        to: '/cashier',
        icon: <IconCashRegister />,
      },
      {
        label: 'Regular User Dashboard',
        to: '/regular',
        icon: <IconUser />,
      },

      {
        label: 'Event Organizer',
        to: '/event-organizer',
        icon: <IconCalendar />,
      },
    ],
    4: [
      {
        label: 'Dashboard',
        to: '/manager',
        icon: <IconLayoutDashboard />,
      },
      {
        label: 'Cashier Dashboard',
        to: '/cashier',
        icon: <IconCashRegister />,
      },
      {
        label: 'Regular User Dashboard',
        to: '/regular',
        icon: <IconUser />,
      },
      {
        label: 'Event Organizer',
        to: '/event-organizer',
        icon: <IconCalendar />,
      },
    ],
  }

  const generalLinks = [
    {
      label: 'Transactions',
      to: clearance <= 2 ? '/regular/transaction' : '/manager/transactions',
      icon: <IconCreditCard />,
    },
    {
      label: 'Events',
      to: clearance <= 2 ? '/regular/events' : '/manager/events',
      icon: <IconTicket />,
    },
    {
      label: 'Promotions',
      to: clearance <= 2 ? '/regular/promotions' : '/manager/promotions',
      icon: <IconTags />,
    },
  ]

  const navLink = (to, label, icon) => (
    <Button
      variant={to === location.pathname ? 'filled' : 'subtle'}
      fw={'semibold'}
      onClick={() => navigate(to)}
      pl="lg"
      pr="lg"
      pt="0"
      pb="0"
      h="50px"
      c="white"
      color={'rgba(255, 255, 255, 0.1)'}
      leftSection={icon}
      styles={{
        inner: {
          justifyContent: 'flex-start',
        },
        root: {
          borderRadius: 0,
        },
      }}>
      {label}
    </Button>
  )

  return (
    <>
      <Modal opened={opened} onClose={close} title="Settings" size={'60vw'}>
        <Settings close={close} />
      </Modal>
      <Box
        bg={getGradient({ deg: 145, from: 'blue', to: 'cyan.3' }, theme)}
        h={'100vh'}
        w="100%"
        pos={'sticky'}
        top="0">
        <Flex justify="space-between" h="100%" direction="column">
          <Flex justify={'space-between'} p="lg">
            <Title fw={'bold'} c="white">
              Loyalty
            </Title>
            <Tooltip label="Settings">
              <ActionIcon size={'input-md'} onClick={open} variant="subtle" c="white" color="white">
                <IconSettings />
              </ActionIcon>
            </Tooltip>
          </Flex>

          <Flex justify={'center'} direction="column" gap={'80px'}>
            <Flex justify={'center'} direction="column">
              <Box pb="md">
                <Title c="white" fz={'xs'} pl="lg" pr="lg">
                  Roles
                </Title>
              </Box>

              <Stack gap={'0'} w={'100%'}>
                {clearanceToLinks[clearance] &&
                  clearanceToLinks[clearance].map((l) => navLink(l.to, l.label, l.icon))}
              </Stack>
            </Flex>

            <Flex justify={'center'} direction="column">
              <Box pt="md" pb="md">
                <Title c="white" fz="xs" pl="lg" pr="lg">
                  General
                </Title>
              </Box>

              <Stack gap={'0'} w={'100%'}>
                {generalLinks.map((l) => navLink(l.to, l.label, l.icon))}
              </Stack>
            </Flex>
          </Flex>
          <Button
            variant="subtle"
            fw={'semibold'}
            onClick={handleLogout}
            pl="lg"
            pr="lg"
            pt="0"
            pb="0"
            mb={'lg'}
            h="50px"
            leftSection={<IconLogout />}
            c="white"
            styles={{
              inner: {
                justifyContent: 'flex-start',
              },
              root: {
                borderRadius: 0,
              },
            }}>
            Log out
          </Button>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
