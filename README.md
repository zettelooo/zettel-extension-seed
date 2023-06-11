# Zettel Module Boilerplate

This repository contains a sample project that you can use as the starting point for developing a [Zettel](https://app.zettel.ooo) module.

If it's your first time buidling a Zettel module, please check out Zettel docs for beginner tutorials. 

--- 

The repository consists of three projects:

1. The `client` project, this is the main extension implementation which will be a part of the Web app itself.

   Here are the scripts to support that:

   - To update the Zettel official dependencies to their newest versions in order to access the latest API end-points and data models:

     ```sh
     client$ npm run update
     ```

   - To upgrade the extension version in `public/manifest.jsonc` file:

     ```sh
     client$ npm run version -- patch
     client$ npm run version -- minor
     client$ npm run version -- major
     ```

   - To build the extension and pack the zip file to be uploaded to [Zettel Developer Console](https://app.zettel.ooo/developer):
     ```sh
     client$ npm run build
     ```
     > **Note:** The built extension goes to the `client/out` folder.

   - Same as above, plus it also takes care of the upload part:
     ```sh
     client$ npm run deploy
     ```

1. The `server` project, which can only help by extensions that require their own server-side implementation.

   Here are the scripts to support that:

   - To update the Zettel official dependencies to their newest versions in order to access the latest API end-points and data models:

     ```sh
     server$ npm run update
     ```

   - To start the server:
     ```sh
     server$ npm run dev   # For development, with hot reloads
     server$ npm start     # For production
     ```
     > **Note:** You can specify on what port it will serve your API by prepending `PORT=4000` to the commands above, by default it uses the port `4000`.

1. The `shared` project, which contains the shared implementation between the two others.

   Here are the scripts to support that:

   - To update the Zettel official dependencies to their newest versions in order to access the latest API end-points and data models:

     ```sh
     shared$ npm run update
     ```

All projects are filled with some dummy implementations to show-case how to setup things, feel free to modify it, or even start your own projects following the prctices used in this seed project.


