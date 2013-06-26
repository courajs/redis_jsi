This is sort of an ad-hoc redis ORM. Right now this is only the read half, and can't really interface with other programs - it's only a command line client.
It will resolve any 'pointers' -- that is if the value of a key is the same as another key, it turns into a javascript reference
Run it, and you will be dumped into a repl, with the contents of a local redis instance stored in the 'result' variable

It's written to be installed globally:  
```
npm install -g redis-jsi
```

Then run using `redis-jsi`