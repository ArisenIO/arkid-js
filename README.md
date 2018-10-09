<p align="center">
  <img src="https://raw.githubusercontent.com/ArisenIO/arisen-media/master/repo-headers/arkid-js.png"/>
</p>



[![npm version](https://badge.fury.io/js/arkid-js.svg)](https://badge.fury.io/js/arkid-js) arkid-js

## Right now you should still be using `arkid-js` and not this `arkid-js-core` library as it is still in alpha. [Click Here](https://github.com/arisenio/arkid-js/tree/2.5.1) to go to the latest version of `arkid-js` which is being used in production applications and is stable.

## Installation

To use ArkIdJS you must have _at least_ the core.
You can also use ArkId without any blockchain support
by simply importing only the core without any blockchain specific
plugins.

This is great for sites that want to authenticate with users in a
decentralized way, but don't need any blockchain functionality.

```js
npm i -S arkid-js-core
```

### Plugins
To keep this library small and focused only on the blockchains you want to use
you can import each blockchain separately. The blockchains you don't import
can't be used.

#### ARISENIO
```
npm i -S arkid-js-plugin-arisenjs
```

#### Ethereum
```
npm i -S arkid-js-plugin-web3
```

-------

The same works with `yarn` as well if you prefer to use that.
```
yarn link arkid-js-core
yarn link arkid-js-plugin-arisenjs
```


## Importing ArkIdJS into your project.
Now that you have arkid-js-core and a plugin of your choosing you
can go ahead and import it into your project.

You should be doing this early in your application, somewhere like
your main.js or app.js, and not inside sub-pages.

Let's take `arisenjs` as an example.

```js
import ArkIdJS from 'arkid-js-core';
import ArkIdRSN from 'arkid-js-plugin-arisenjs'

ArkIdJS.plugins( new ArkIdRSN() );
```


## ArkIdJS Usage

This library catches ArkId Desktop, ArkId Mobile and ArkId Classic ( extension ).
You only need to write code once, and you will instantly support any ArkId the user has.


#### Making a connection

```js
ArkIdJS.arkid.connect("Put_Your_App_Name_Here").then(connected => {
    if(!connected) {
        // User does not have ArkId installed/unlocked.
        return false;
    }

    // Use `arkid` normally now.
    ArkIdJS.arkid.getIdentity(...);
});
```


### Connection Options

```js
{
    // You may specify a maximum timeout for checking if a user has ArkId installed
    initTimeout:10000,
}
```

# What now?
Head over to the [ArkId Developer Documentation](https://docs.arkid.io/getting-started) to learn about
all the amazing things you can do with ArkId.

There's also a lot more information about proper setup in the
[Setting up for Web Applications](https://docs.arkid.io/setting-up-for-web-apps)
section which will help you get the most out of ArkIdJS, and make sure
you aren't exposing your users to malicious non-ArkId plugins.
