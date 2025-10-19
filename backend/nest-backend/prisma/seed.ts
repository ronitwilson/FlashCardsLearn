import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sightWords = [
  'the','and','a','to','in','is','you','that','it','he',
  'was','for','on','are','as','with','his','they','I','at'
];

async function main() {
  for (const w of sightWords) {
    await prisma.word.upsert({
      where: { text: w },
      update: {},
      create: { text: w }
    });
  }
  console.log('Seeded words:', sightWords.length);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });