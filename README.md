# sveltekit-directus-starter

This is my attempt to showcase two of my favorite technologies working together
in a simple, understandable way.

I call this project a demo but it could also be used as a starter. There are definitely
more features than needed to be a starter. I have also added some very basic styling, 
I just couldn't do less, I'm sorry.

I have included some things that might seem unnecessary, but the goal is to show off concepts from both pieces of tech.

Anyone and everyone is welcome to use the code from this project however they see fit.

## Requirements

To run locally, this stack requires:
- Node 16+ & a package manager
- Docker (for Directus)

## Goals of this project

- Create an easy to read and follow project structure
- Utilize SvelteKit to allow the app to work with
  JavaScript Disabled
- Everything strongly typed using TypeScript
- A good showcase of Diretus and some of it's features

## Things to remember

- Will need to import data for full the demo to work.
- The SvelteKit structure would need to be changed if you plan on using pre-rendered pages or ISR.

## Setup

This project should only take a few minutes to setup on your own machine.

### .env

Please setup an .env file with this info:

```env
DIRECTUS_URL=
```

## Future of this project

Any help or suggestions are welcomed. I plan on adding:

- A range of tests
