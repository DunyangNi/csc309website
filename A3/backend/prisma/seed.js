/**
 * seed.js
 *
 * How to run:
 *   1) npx prisma db push
 *   2) node seed.js
 *
 * This script seeds:
 *   - At least 10 users (including 1 cashier, 1 manager, 1 superuser)
 *   - At least 5 events
 *   - At least 5 promotions
 *   - At least 30 transactions, ensuring at least 2 of each type
 *
 * IMPORTANT: We store plaintext passwords here ONLY for demonstration!
 */

import { PrismaClient, Role, TransactionType, PromotionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.transaction.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.promotion.deleteMany({});
  await prisma.user.deleteMany({});


  const alice = await prisma.user.create({
    data: {
      utorid: 'alice666',
      name: 'Alice Liddell',
      email: 'alice.liddell@mail.utoronto.ca',
      role: Role.CASHIER,
      password: 'AlicePass123!',
      verified: true,
    },
  });
  const bob = await prisma.user.create({
    data: {
      utorid: 'bobman99',
      name: 'Bob Manager',
      email: 'bob.manager@mail.utoronto.ca',
      role: Role.MANAGER,
      password: 'BobManager123!',
      verified: true,
    },
  });
  const clark = await prisma.user.create({
    data: {
      utorid: 'superman7',
      name: 'Clark Kent',
      email: 'clark.kent@mail.utoronto.ca',
      role: Role.SUPERUSER,
      password: 'SuperPass123!',
      verified: true,
    },
  });

  const nidunyan = await prisma.user.create({
    data: {
      utorid: 'nidunyan',
      name: 'Dunyang Ni',
      email: 'dunyang.ni@mail.utoronto.ca',
      role: Role.SUPERUSER,
      password: 'SuperUser123!',
      verified: true,
    },
  });


  const userData = [
    {
      utorid: 'johndoe1',
      name: 'John Doe',
      email: 'john.doe@mail.utoronto.ca',
      password: 'JohnPassword!',
      verified: true,
      birthday: '2000-01-01',
    },
    {
      utorid: 'janedoe1',
      name: 'Jane Doe',
      email: 'jane.doe@mail.utoronto.ca',
      password: 'JanePassword!',
      verified: false,
    },
    {
      utorid: 'friend69',
      name: 'Friendly Person',
      email: 'friendly.person@mail.utoronto.ca',
      password: 'FriendPass!',
      verified: true,
    },
    {
      utorid: 'thomas22',
      name: 'Thomas Turing',
      email: 'thomas.turing@mail.utoronto.ca',
      password: 'ThomasPass!',
      verified: true,
    },
    {
      utorid: 'kian1234',
      name: 'Mo Kian',
      email: 'mo.kian@mail.utoronto.ca',
      password: 'KianPass!',
      verified: true,
    },
    {
      utorid: 'harryp09',
      name: 'Harry Potter',
      email: 'harry.potter@mail.utoronto.ca',
      password: 'HarryPass!',
      verified: false,
    },
    {
      utorid: 'ritaSky12',
      name: 'Rita Sky',
      email: 'rita.sky@mail.utoronto.ca',
      password: 'RitaPass!',
      verified: true,
    },
  ];
  const regularUsers = [];
  for (const data of userData) {
    const u = await prisma.user.create({ data });
    regularUsers.push(u);
  }
  const [john, jane, friend, thomas, kian, harry, rita] = regularUsers;


  const now = new Date();
  const past1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);  // 7 days ago
  const past2 = new Date(now.getTime() - 24 * 60 * 60 * 1000);      // 1 day ago
  const future1 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days
  const future2 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);// +14 days

  const promo1 = await prisma.promotion.create({
    data: {
      name: 'Buy a pack of Pepsi',
      description: 'Earn 20 bonus points when you buy a Pepsi Pack',
      type: PromotionType.ONETIME,
      startTime: past1,
      endTime: future1,
      minSpending: null,
      rate: null,
      points: 20,
    },
  });
  const promo2 = await prisma.promotion.create({
    data: {
      name: 'Summer Booster',
      description: 'Extra 1 point per dollar spent over $50',
      type: PromotionType.AUTOMATIC,
      startTime: past2,
      endTime: future1,
      minSpending: 50,
      rate: 1.0,
      points: 0,
    },
  });
  const promo3 = await prisma.promotion.create({
    data: {
      name: 'Start of Summer Celebration',
      description: '1 extra point per dollar, triggered at $50, ends soon.',
      type: PromotionType.AUTOMATIC,
      startTime: now,
      endTime: future2,
      minSpending: 50,
      rate: 1.0,
      points: 0,
    },
  });
  const promo4 = await prisma.promotion.create({
    data: {
      name: 'One-Time 100 Points',
      description: 'One-time instant 100 points for spending $30 or more.',
      type: PromotionType.ONETIME,
      startTime: now,
      endTime: future2,
      minSpending: 30,
      rate: null,
      points: 100,
    },
  });
  const promo5 = await prisma.promotion.create({
    data: {
      name: 'Loyalty Bonus',
      description: 'Autom. 2 extra points per dollar (already ended)',
      type: PromotionType.AUTOMATIC,
      startTime: past1,
      endTime: past2, // ended
      minSpending: 10,
      rate: 2.0,
      points: 0,
    },
  });
  const promo6 = await prisma.promotion.create({
    data: {
      name: 'Winter Sale',
      description: 'Earn 3 points per dollar spent on all items',
      type: PromotionType.AUTOMATIC,
      startTime: now,
      endTime: future2,
      minSpending: null,
      rate: 3.0,
      points: 0,
    },
  });

  const event1 = await prisma.event.create({
    data: {
      name: 'Event 1',
      description: 'A simple event',
      location: 'BA 2250',
      startTime: future1,
      endTime: future2,
      capacity: 200,
      pointsRemain: 500,
      published: false,
      organizers: { connect: [{ id: bob.id }] },
    },
  });
  const event2 = await prisma.event.create({
    data: {
      name: 'Event 2',
      description: 'An open event',
      location: 'Bahen Lobby',
      startTime: future1,
      endTime: future2,
      capacity: null, // unlimited
      pointsRemain: 1000,
      published: true,
      organizers: { connect: [{ id: alice.id }] },
      guests: { connect: [{ id: john.id }] },
    },
  });
  const event3 = await prisma.event.create({
    data: {
      name: 'Event 3',
      description: 'Retro event, already ended',
      location: 'Convocation Hall',
      startTime: past1,
      endTime: past2,
      capacity: 50,
      pointsRemain: 50,
      pointsAwarded: 50,
      published: true,
      organizers: { connect: [{ id: clark.id }] },
      guests: { connect: [{ id: friend.id }, { id: thomas.id }] },
    },
  });
  const event4 = await prisma.event.create({
    data: {
      name: 'Event 4',
      description: 'Another future event',
      location: 'Sid Smith Basement',
      startTime: future1,
      endTime: future2,
      capacity: 10,
      pointsRemain: 300,
      published: false,
      organizers: { connect: [{ id: bob.id }, { id: clark.id }] },
    },
  });
  const event5 = await prisma.event.create({
    data: {
      name: 'Event 5',
      description: 'Yet another event - published',
      location: 'Online',
      startTime: future1,
      endTime: future2,
      capacity: 5,
      pointsRemain: 200,
      published: true,
      organizers: { connect: [{ id: bob.id }] },
      guests: { connect: [{ id: jane.id }, { id: harry.id }] },
    },
  });
  const event6 = await prisma.event.create({
    data: {
      name: 'Event 6',
      description: 'Another event - not published',
      location: 'Online',
      startTime: future1,
      endTime: future2,
      capacity: 5,
      pointsRemain: 200,
      published: false,
      organizers: { connect: [{ id: alice.id }] },
    },
  });

  const basePointsForPurchase = (spent) => Math.round(spent / 0.25);

  const basePurchases = [];
  basePurchases.push(
    await prisma.transaction.create({
      data: {
        type: TransactionType.PURCHASE,
        spent: 10.0,
        points: basePointsForPurchase(10.0), // 40
        userId: john.id,
        createdById: alice.id,
        remark: 'Buying some snacks',
      },
    }),
  );
  basePurchases.push(
    await prisma.transaction.create({
      data: {
        type: TransactionType.PURCHASE,
        spent: 60.0,
        points: basePointsForPurchase(60.0), // 240
        userId: jane.id,
        createdById: alice.id,
        remark: 'Groceries',
      },
    }),
  );
  basePurchases.push(
    await prisma.transaction.create({
      data: {
        type: TransactionType.PURCHASE,
        spent: 100.0,
        points: basePointsForPurchase(100.0), // 400
        userId: thomas.id,
        createdById: alice.id,
        remark: 'Electronics purchase',
      },
    }),
  );
  basePurchases.push(
    await prisma.transaction.create({
      data: {
        type: TransactionType.PURCHASE,
        spent: 3.49,
        points: basePointsForPurchase(3.49), // ~14
        userId: friend.id,
        createdById: alice.id,
        remark: 'Small purchase',
        suspicious: true,
      },
    }),
  );

  const baseRedemptionProcessed = await prisma.transaction.create({
    data: {
      type: TransactionType.REDEMPTION,
      points: -500, // already deducted
      userId: john.id,
      createdById: john.id,
      redeemed: 500,
      processedById: alice.id, // cashier
      remark: 'Redeem big prize',
    },
  });
  const baseTransferSender = await prisma.transaction.create({
    data: {
      type: TransactionType.TRANSFER,
      points: -300,
      userId: john.id,
      createdById: john.id,
      relatedUserId: friend.id,
      remark: 'Transfer for poker debt',
    },
  });
  const baseTransferReceiver = await prisma.transaction.create({
    data: {
      type: TransactionType.TRANSFER,
      points: 300,
      userId: friend.id,
      createdById: john.id,
      relatedUserId: john.id,
      remark: 'Transfer incoming from John',
    },
  });
  const baseEventTx = await prisma.transaction.create({
    data: {
      type: TransactionType.EVENT,
      points: 100,
      userId: john.id,
      createdById: alice.id,
      eventId: event2.id, // awarding from Event 2
      remark: 'Trivia winner at Event 2',
    },
  });

  const adjustTx1 = await prisma.transaction.create({
    data: {
      type: TransactionType.ADJUSTMENT,
      points: -10,
      userId: john.id,
      createdById: bob.id,
      remark: 'Manual point deduction for error on John’s first purchase',
      AdjustedTransactionId: basePurchases[0].id, // references John's first purchase
    },
  });
  const adjustTx2 = await prisma.transaction.create({
    data: {
      type: TransactionType.ADJUSTMENT,
      points: 20,
      userId: jane.id,
      createdById: bob.id,
      remark: 'Manual point addition for apology on Jane’s purchase',
      AdjustedTransactionId: basePurchases[1].id,
    },
  });

  const redemptionPending = await prisma.transaction.create({
    data: {
      type: TransactionType.REDEMPTION,
      points: 0, // not deducted yet
      userId: jane.id,
      createdById: jane.id,
      redeemed: 200,
      remark: 'Redeem gift card (pending)',
    },
  });

  const eventAwardFriend = await prisma.transaction.create({
    data: {
      type: TransactionType.EVENT,
      points: 20,
      userId: friend.id,
      createdById: clark.id,
      eventId: event3.id,
      remark: 'Door prize at Event 3',
    },
  });

  const transferThomasToJane = await prisma.transaction.create({
    data: {
      type: TransactionType.TRANSFER,
      points: -100,
      userId: thomas.id,
      createdById: thomas.id,
      relatedUserId: jane.id,
      remark: 'Thomas -> Jane gift',
    },
  });
  const transferJaneFromThomas = await prisma.transaction.create({
    data: {
      type: TransactionType.TRANSFER,
      points: 100,
      userId: jane.id,
      createdById: thomas.id,
      relatedUserId: thomas.id,
      remark: 'Thomas -> Jane gift (incoming)',
    },
  });

  const extraTxData = [];
  for (let i = 0; i < 16; i++) {
    const spentVal = 5.0 + i;
    extraTxData.push({
      type: TransactionType.PURCHASE,
      spent: spentVal,
      points: basePointsForPurchase(spentVal),
      userId: rita.id,
      createdById: alice.id,
      remark: `Extra purchase #${i + 1} by Rita`,
    });
  }
  await prisma.transaction.createMany({ data: extraTxData });

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
