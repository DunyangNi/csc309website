#!/usr/bin/env node
'use strict'

const port = (() => {
  const args = process.argv

  if (args.length !== 3) {
    console.error('usage: node index.js port')
    process.exit(1)
  }

  const num = parseInt(args[2], 10)
  if (isNaN(num)) {
    console.error('error: argument must be an integer.')
    process.exit(1)
  }

  return num
})()

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

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

server.on('error', (err) => {
  console.error(`cannot start server: ${err.message}`)
  process.exit(1)
})
