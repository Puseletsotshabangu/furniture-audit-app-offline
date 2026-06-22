SchoolAudit — Northern Cape
Offline Tablet Setup Guide
==========================

RECOMMENDED: Use the local server (avoids browser file:// restrictions)
------------------------------------------------------------------------

Windows tablets
  1. Copy the entire folder to the tablet (USB stick, shared drive, etc.)
  2. Double-click  "Start SchoolAudit.bat"
  3. The app opens automatically in the default browser.
  4. Keep the black console window open while using the app.
  5. Close the console window when done.

  Requirement: Python 3 must be installed.
  Download free at https://www.python.org/downloads/
  (Tick "Add Python to PATH" during installation.)

Android / Chromebook / any tablet with Python
  1. Copy the folder to the tablet.
  2. Open a terminal in the folder and run:
       python3 server.py
  3. Open the browser and go to:
       http://localhost:8765/index.html

Any computer — manual command
  python3 server.py          (Mac / Linux / Android terminal)
  py server.py               (Windows alternative)


ALTERNATIVE: Direct file open (may work on Chrome/Edge without a server)
------------------------------------------------------------------------
  1. Open Chrome or Edge.
  2. Drag index.html into the browser window.
  3. If scripts are blocked, use the server method above instead.


OFFLINE AFTER FIRST LOAD (Service Worker)
-----------------------------------------
Once the app has been opened successfully via the server, the browser
caches all files automatically. After that the app loads even when the
server is not running — just open http://localhost:8765/index.html
in the same browser.


DATA & BACKUPS
--------------
- All data is saved automatically in the browser's local storage.
- Use Export > Save Full Backup regularly to download a JSON file.
- To combine data from multiple tablets use Export > Merge.
- Clearing browser data / cache will erase local storage — always keep
  a recent backup file somewhere safe (USB stick, shared drive).


FOLDER CONTENTS
---------------
  index.html               Main app entry point
  app.js                   Application logic
  style.css                Styles
  sw.js                    Service Worker (offline caching)
  server.py                Local server (Python 3)
  "Start SchoolAudit.bat"  Windows double-click launcher
  schools.csv              NC EMIS school list
  vendor/                  React + Babel (bundled, no internet needed)
  validate_emis_import.js  EMIS CSV validation utility (Node.js)
