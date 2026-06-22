#!/usr/bin/env python3
"""
SchoolAudit — local file server
Double-click this file (or run: python3 server.py) to start the app.
The browser will open automatically. Press Ctrl+C in this window to stop.
"""
import http.server, socketserver, webbrowser, threading, os, sys

PORT = 8765
DIR  = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def log_message(self, fmt, *args):
        pass  # silence request noise

def open_browser():
    webbrowser.open(f"http://localhost:{PORT}/index.html")

print("=" * 52)
print("  SchoolAudit — Northern Cape")
print(f"  Server running at http://localhost:{PORT}")
print("  Opening browser automatically...")
print("  Press Ctrl+C to stop.")
print("=" * 52)

threading.Timer(0.8, open_browser).start()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.allow_reuse_address = True
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
