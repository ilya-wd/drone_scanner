# No Drones In The Wild

## You can find the app at https://no-drones-in-the-wild.fly.dev/

### [Task description here](https://assignments.reaktor.com/birdnest/)

### What it does

The app displays the data about pilots and drones who violated a no drone zone (NDZ) around a Monadikuikka nest on a local lake as well as their drones.

In addition to pilot's credentials, a user can see the closest distance a pilot's drone approached to the nest, it's current distance, and when in the past 10 minutes the drone was last noticed in NDZ.

A user can send an email to a pilot who violated the NDZ by clicking their email – authorities are automatically CC'd.

On top of that, it is possible to observe drones' movements inside the NDZ live on a map. Due to unpredictable (and unseen before!) drones' movement patterns, they can appear as teleporting – but it's what the scanner inside of the NDZ transmits. 

Other features – scanner name, scanner and server uptimes.

### General workflow

1. A request is sent to the API every second with a cron job
2. Received data is parsed. Device info is saved to DB
3. A drone violates the NDZ? If a drone is not in the DB it is added and pilot data is fetched from the API. Alternatively drone is updated in DB
4. Client fetches data with [SWR](https://swr.vercel.app/)

### Stack

- Frontend: ReactJS with Bootstrap
- Backend: NodeJS with Express
- DB: SQLite and Prisma

### Launching the app locally

1. Clone the repository
2. Create .env file. Specify url for your sqlite database `DATABASE_URL` and `PORT` for the server
3. Run `cd ./backend_birds && npm i` and `cd ./frontend_birds && npm i` from the root
4. Since the /build directory is uploaded to the repository, you can simply run the following command from the root to launch the app:
  `cd ./backend_birds && npm run start` 
  If you plan to tinker with the app:
  `npm run dev` from /backend_birds directory to activate nodemon
  `npm run build:ui` from /backend_birds directory to create a front end build

### CI/CD and testing

CI/CD is implemented via GitHub actions

Some integration tests are written for back end. 
Also some React components are tested.

### Areas of improvement
1. Write more tests for backend.
2. Improve CI/CD by integrating tests.
3. Use Docker for easier and cleaner deployment without artifacts
4. Add accessibility features