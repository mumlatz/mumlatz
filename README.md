# Mumlatz

## What is Mumlatz

Ever wanted to buy something but didn't want to do the market research? So what do you do, you ask a friend what they have, and if they like it or not right?
So that's Mumlatz. It's an app for social product review sharing. You enter what products you own and if you recommend them, your friends do the same, and you are able to search for prodct recommendations by the people you know and trust. 

Mumlatz was created as an educational project to give Junior developers the opportunity to contribute features to a real world app.

## Some technicalities

This repo was create using [Create T3 Turbo](https://github.com/t3-oss/create-t3-turbo). I suggest checking out their README.

It includes:  
* A React Native App using Expo
* A tRPC API
* A Prisma Database 

I know these all sounds new and scary, but don't worry! They're new to me too 🙂

Here are some links about these technologies:
* [Prisma in 100 seconds](https://www.youtube.com/watch?v=rLRIB6AF2Dg&ab_channel=Fireship)
* [What is tRPC](https://www.youtube.com/watch?v=f9KPBIIKCHY&ab_channel=Evoqys)

This project uses `pnpm` as a package manager. Here's [how to install it](https://pnpm.io/installation)

**Important line for repo setup**:
```
// run these two commands from the project root
echo DATABASE_URL=file:./db.sqlite >> packages/db/.env
pnpm db-push
```

Some other links:
* A very (very) basic (beginning of a) [mockup](https://excalidraw.com/#json=ABcN26iP3FddKw3UQZ1Hj,O9w8LK8kxAFyY-jZ1oqzHg) for the Mumlatz app:
* Our official [Slack channel](https://join.slack.com/t/slack-bkn2400/shared_invite/zt-1inod2x2e-UZRs7189ueYnwHWwDFwATg)! Please join it
* Checkout our [Issues page](https://github.com/mumlatz/mumlatz/issues/1) for tasks/discussions

This project is in very early stages, but together we will bring it to life!
