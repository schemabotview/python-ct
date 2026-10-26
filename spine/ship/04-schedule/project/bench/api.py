"""A stand-in for the shop's API: each request takes 0.1s to answer."""

import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from pipeline.extract import ApiSource

RAW = Path("data/raw")
DAYS = [f"2026-10-{day:02}" for day in range(1, 32)]


class Orders(BaseHTTPRequestHandler):
    def do_GET(self):
        time.sleep(0.1)
        day = self.path.removeprefix("/orders/")
        body = (RAW / f"orders-{day}.csv").read_bytes()
        body = body.decode("utf-8", "replace").encode("utf-8")
        self.send_response(200)
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


server = ThreadingHTTPServer(("127.0.0.1", 0), Orders)
threading.Thread(target=server.serve_forever, daemon=True).start()
host, port = server.server_address

start = time.perf_counter()
for day in DAYS:
    urllib.request.urlopen(f"http://{host}:{port}/orders/{day}").read()
print(f"one request at a time: {time.perf_counter() - start:.2f}s")

start = time.perf_counter()
rows = list(ApiSource(host, port, DAYS).rows())
print(
    f"all 31 at once:        {time.perf_counter() - start:.2f}s, "
    f"{len(rows)} rows"
)
