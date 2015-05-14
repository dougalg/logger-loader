#Readme

A simple loader that wraps modules in `try`/`catch` blocks, and allows you to specify a function to call with the
error as an argument.

##Installation

```npm install --save-dev logger-loader```

##Usage

###webpack.config

```
module: {
    loaders: [
        {
            test: /.*\.js/,
            loader: 'logger-loader?module=error_logger'
        }
}
```


###Logging module

The above will only wrap your modules in try/catch blocks. You still need to ensure that the `error_logger`
module returns a function that will accept the error to be logged. Essentially your code will now look like this:

```
try {
    ...
    Your loaded module...
    ...
}
catch (e) {
    error_logger(e);
}
```
