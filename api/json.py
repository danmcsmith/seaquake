from http.server import BaseHTTPRequestHandler
import json
import requests
import datetime as date


def get_quake_data():
    uri = 'http://earthquake.usgs.gov/fdsnws/event/1/query'
    today = date.datetime.now()
    last_week = today - date.timedelta(days=7)
    fmt = lambda d: f"{d.year}-{d.month}-{d.day}"
    payload = {
        'format': 'geojson',
        'starttime': fmt(last_week),
        'endtime': fmt(today),
        'minlatitude': 45,
        'maxlatitude': 50,
        'minlongitude': -126,
        'maxlongitude': -116,
    }
    return requests.get(uri, params=payload).json()


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            data = get_quake_data()
            body = json.dumps(data).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
