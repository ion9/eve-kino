[![Build Status](https://secure.travis-ci.org/dertseha/eve-kino.png?branch=master)](http://travis-ci.org/dertseha/eve-kino)

eve-kino is a web application to generate short movies using the art assets of EVE Online.

I wanted to see what it was like back in the day, so I got the input working.

**This project has been discontinued. If you find some re-use, dertseha would be happy about a reference.**

Using the WebGL library from CCP, ccpwgl, this project provides a browser application to create spaceship animations.
The production mirrors the recording of film; Instead of modifying orientation/position parameters by hand per frame, the actors (ships, ...)
are recorded from the user input in real-time one by one, while the others replay their previously recorded script.

Primary input control is the gamepad (joystick) using the Gamepad-API from browsers.

Supported browsers are:
* Chrome (Webkit, standard)
* Firefox (Nightly builds because of experimental support of Gamepad-API)

## Client Dependencies
* require.js 2.1.5
* Angular.js 1.0.6
* gl-matrix.js 1.3.7
* ccpwgl https://github.com/ccpgames/ccpwgl
* gamepad https://github.com/kallaspriit/HTML5-JavaScript-Gamepad-Controller-Library
* Q 0.9.6
* jski https://github.com/skoni/jski (via browserify)

## License

The project is available under the terms of the [New BSD License](LICENSE).
