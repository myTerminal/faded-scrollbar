# faded-scrollbar

[![npm version](https://badge.fury.io/js/faded-scrollbar.svg)](https://badge.fury.io/js/faded-scrollbar)
[![npm downloads](https://img.shields.io/npm/dt/faded-scrollbar.svg)](https://www.npmjs.com/package/faded-scrollbar)
[![Bower version](https://badge.fury.io/bo/faded-scrollbar.svg)](https://badge.fury.io/bo/faded-scrollbar)  
[![Build Status](https://travis-ci.org/myTerminal/faded-scrollbar.svg?branch=master)](https://travis-ci.org/myTerminal/faded-scrollbar)
[![Code Climate](https://codeclimate.com/github/myTerminal/faded-scrollbar.png)](https://codeclimate.com/github/myTerminal/faded-scrollbar)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/faded-scrollbar.svg)](https://coveralls.io/r/myTerminal/faded-scrollbar?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/myTerminal/faded-scrollbar/badges/score.svg)](https://www.bithound.io/github/myTerminal/faded-scrollbar)
[![bitHound Code](https://www.bithound.io/github/myTerminal/faded-scrollbar/badges/code.svg)](https://www.bithound.io/github/myTerminal/faded-scrollbar)  
[![Dependency Status](https://david-dm.org/myTerminal/faded-scrollbar.svg)](https://david-dm.org/myTerminal/faded-scrollbar)
[![devDependency Status](https://david-dm.org/myTerminal/faded-scrollbar/dev-status.svg)](https://david-dm.org/myTerminal/faded-scrollbar#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/faded-scrollbar/peer-status.svg)](https://david-dm.org/myTerminal/faded-scrollbar#info=peerDependencies)  
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)
[![Gratipay](http://img.shields.io/gratipay/myTerminal.svg)](https://gratipay.com/myTerminal)

A simple skinnable scrollbar for web

## Features

* An easy to use custom scrollbar that works out of the box with a simple function invocation.
* Can be easily themed

## How to Use

Include `faded-scrollbar.min.js` script file and `fade-scrollbar.css` stylesheet along with jQuery in the HTML page.

Set the dimensions (especially the height) of the element on which you want the scrollbar to appear.

Instantiate a scrollbar on the element as below:

    scrollbar = new FadedScrollbar("#container");

When the content inside the element changes (addition or removal of content), just invoke `refresh()` on the scrollbar as

    scrollbar.refresh();

When the scrollbar is no longer required, call a `destroy()` on the scrollbar and the original markup will be brought back.

    scrollbar.destroy();

## Demo

You can view a demo [here](https://myterminal.github.io/faded-scrollbar/example/)

## Dependency

* jQuery

## To-do

* Scroll buttons
* Scrolling with dragger
* Touch events
