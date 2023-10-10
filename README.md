# Foundations React Vite Template

This repo is the template for building Reapit Foundations React apps, from v4 of Reapit Elements onwards. It replaces the earlier Create React App template, owing to the React team deciding to deprecate CRA.

It includes the usual Reapit Packages (Connect Session, Elements, TS Defintions), UI and Data fetching examples as well as some battle hardened libraries we use internally for building apps for example React Hook Form, React Query & Zustand.

As always, it should give you everything you need to get started building on the Reapit Foundations platform. For more documentation on our APIs and other resources, please visit our [developer portal](https://developers.reapit.cloud).

## Getting Started

First, if you don't have a Reapit Connect client id yet, will need to obtain one [here](https://developers.reapit.cloud/apps/new).

If you are creating a fresh client id or already have one but want to see the full functionality of the template, you will need to add the following scopes to your app `read contacts`, `write contacts`, `read negotiators` & `read offices` - you can always remove these scopes later if you don't need them.

Ensure also you have set `http://localhost:8080` as a redirect uri and `http://localhost:8080/login` as a logout uri in your app settings in the [developer portal](https://developers.reapit.cloud/apps).

The output app will create a simple CRUD contacts app to demonstrate the features of the platform.

Then with `NodeJS ~18` installed, run;

```
npx degit reapit/foundations-react-vite-template#templates/vite-simple <<Your App Name>> --mode=git
```

Then;

```
git init
```

And;

```
yarn
```

Add your `connectClientId` to the `.env` file at the root of the project.

Finally to start a server at `http://localhost:8080`;

```
yarn start
```

For a full list of commands, see the README in the directory of the scaffolded app.
