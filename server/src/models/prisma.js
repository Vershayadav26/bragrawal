const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dbFile = path.join(__dirname, '../../prisma/dev.db');
process.env.DATABASE_URL = `file:${dbFile.replace(/\\/g, '/')}`;

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
