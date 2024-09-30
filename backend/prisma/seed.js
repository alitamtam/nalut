// prisma/seed.js
import prisma from "./index.js";
import bcrypt from "bcrypt";

async function main() {
  // Check if a default user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: "reembg@gmail.com" },
  });

  if (!existingUser) {
    // Hash the password
    const hashedPassword = await bcrypt.hash("Edulibya24**", 10);

    // Create a default user
    await prisma.user.create({
      data: {
        firstName: "malak",
        lastName: "Ben Giaber",
        username: "malakbg",
        email: "malakbg@gmail.com",
        password: hashedPassword, // Store the hashed password
        role: "admin", // or 'member', based on your needs
      },
    });
    console.log("Default user created");
  } else {
    console.log("Default user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
