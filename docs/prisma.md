### 2. Generate a Migration

After updating your schema, generate a migration using the Prisma CLI. This will create a new migration file that contains the necessary SQL commands to update your database schema:

'

npx prisma migrate dev --name projectImage

'

### 4. Apply the Migration

If you ran the `migrate dev` command, the migration has already been applied. If you are using a production database, you should run:

npx prisma migrate deploy

### 5. Use `prisma db push` for Development (Optional)

If you are still in development and just want to update the schema without generating a migration file, you can use:

npx prisma db push
