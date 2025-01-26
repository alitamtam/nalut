import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = [
    {
      name: "superuser",
      description: "Has access to all features",
      hierarchyLevel: 1,
      defaultRole: false,
    },
    {
      name: "health-editor",
      description: "Can manage health-related content",
      hierarchyLevel: 2,
      defaultRole: true,
    },
    {
      name: "story-editor",
      description: "Can manage story-related content",
      hierarchyLevel: 3,
      defaultRole: true,
    },
    {
      name: "event-editor",
      description: "Can manage events",
      hierarchyLevel: 3,
      defaultRole: true,
    },
    {
      name: "general-user",
      description: "Default role for all users",
      hierarchyLevel: 4,
      defaultRole: true,
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  console.log("Roles seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
