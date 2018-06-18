## Features

* CPU efficient
* Check http://amitkumargupta.work for live demo.
* You can set if the list should be repeated.
* You can set if you want to see delete effect.
* You can set delay, interval between each line of text.
* Typing speed and deleting speed is calculated as per the length of text.

## How to use

1. Include tag file on your page

```html
<typewriter></typewriter>

<script src="tags/typewriter.tag.html" type="riot/tag"></script> 
```

**Note**: You'll have to either compile the tag file or include riot compile on the page before mounting it.

```js
    riot.mount('typewriter', { 
        lines : lines,
        deleteEffect : true, //default is true
        rotate : true, //default is true
        speed : 120, //default is 120 ms
        interval : 2000, //default is 2000 ms
        delay : 100, //default is 100ms
    });
```

**Note**: lines is an array of string