inferno-i18next
===============

**inferno-i18next** is a translation utility for Inferno components based on inferno-i18next by Midnite Ninja Innovations (https://bitbucket.org/midniteninja/inferno-i18next) and react-i18next by i18next (https://github.com/i18next/react-i18next)

## Installation

Via NPM:

```
$ npm install --save github:nimbusec-oss/inferno-i18next
```

## Documentation

**Init:** 
```
Inferno.render(
	<Provider i18next={i18next}>
		<App />
	</Provider>,
	document.getElementById("app")
);
```

**Usage T Component:**
```
<T i18nKey="userMessagesUnread" count={2} interpolation={{name: "bar", count:5}}>
	Hello <strong>foo</strong>, you have x unread message. <a href="/msgs">Go to messages</a>
</T>
```

```
"userMessagesUnread": "Hello <1>{{name}}</1>, you have 1 unread message. <3>Go to messages</3>.",
"userMessagesUnread_plural": "Hello <1>{{name}}</1>, you have {{count}} unread messages. <3>Go to messages</3>.",
```

**Further Information:**
The usage is similar to react-i18next, therefore you can use the documents provided by them: 
[React-i18next docs] (https://react.i18next.com/)
