#!/usr/bin/env node
'use strict'
const PORT = process.env.PORT || 3000;

const express = require('express')
const app = express()

app.use(express.json())

// ADD YOUR WORK HERE
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const usersRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const transactionRouter = require('./routes/transactions')
const eventsRouter = require('./routes/events')
const promotionsRouter = require('./routes/promotions')

const cors = require('cors')

// Set up cors to allow requests from your React frontend
app.use(
  cors()
)

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/transactions', transactionRouter)
app.use('/events', eventsRouter)
app.use('/promotions', promotionsRouter)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error(`cannot start server: ${err.message}`)
  process.exit(1)
})
