##### Table of Contents
- [web-go-easy](#web-go-easy)
  - [Initial CLI commands](#initial-cli-commands)
    - [Creation of project](#creation-of-project)
    - [Create database migration](#create-database-migration)
    - [Install dependencies](#install-dependencies)
    - [Generate types for prisma client](#generate-types-for-prisma-client)
  - [Continuously used CLI Commands](#continuously-used-cli-commands)
    - [Create database migration](#create-database-migration-1)
    - [Generate types for prisma client](#generate-types-for-prisma-client-1)
  - [Tertiary CLI Commands](#tertiary-cli-commands)


# web-go-easy

## Initial CLI commands
*These were used for the creation of the project and are not relevant for running the code*
### Creation of project
```
npm create t3-app@latest
```

### Create database migration
```
npx prisma migrate dev --name init
```
### Install dependencies
```
npm install @mantine/core @mantine/hooks @mantine/form @mantine/dates dayjs @mantine/notifications @mantine/modals @mantine/dropzone @emotion/react @tabler/icons zod-prisma-types @formkit/auto-animate
```
### Generate types for prisma client
```
npx prisma generate
```

## Continuously used CLI Commands

### Create database migration
```
npx prisma db push
```

### Generate types for prisma client
```
npx prisma generate
```

## Tertiary CLI Commands
Set your commit email address for Vercel Bot integration to work properly with your commits
```
git config user.email "EMAIL HERE"
```
