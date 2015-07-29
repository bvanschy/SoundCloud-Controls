# SoundCloud-Controls
### Controls for the SoundCloud HTML5 embedded player widget

 - Copyright 2015: Brian VanSchyndel, bvan.ca

 - Licensed under the MIT license.
 
A jQuery plugin for adding play, pause, skip, previous, and volume controls for the SoundCloud HTML5 embedded player to a webpage.

The SoundCloud Widget API documentation can be found [here](https://developers.soundcloud.com/docs/api/html5-widget).

[Demo page](http://bvanschy.github.io/SoundCloud-Controls/test/test.html)


Usage Instructions
======
1. Begin with a webpage containing the SoundCloud player widget and SoundCloud javascript API

2. Include jQuery and jQuery UI

3. Include sc-controls.css and sc-controls.js from this package

4. Add an empty `div` element to the page that will contain the controls

5. Run `$("#controlsDivId").soundCloudControls("playerId", ["cssColor"]);` when the page is finished loading.

Example
======
```
<html>
<head>
  <link rel="stylesheet" type="text/css" href="jquery-ui.css">
  <link href="Content/sc-controls.min.css" rel="stylesheet" />
</head>
<body>
  <iframe id="soundcloud" src="..."></iframe>
  <div id="soundcloudControls"></div>
  <script src="https://w.soundcloud.com/player/api.js"></script>
  <script src="jquery-1.11.3.min.js"></script>
  <script src="jquery-ui.min.js"></script>
  <script src="Scripts/sc-controls.min.js"></script>
  <script>
    $("#soundcloudControls").soundCloudControls("soundcloud", "#9C5857");
  </script>
</body>
</html>
```

LocalStorage
======
The volume level is saved in the browser's local storage with key `SCControlsVol` when changed.

The volume level starts at 50% when the page is loaded for the first time.
