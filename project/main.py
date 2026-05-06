from sanic import Sanic
from sanic.response import json, html
import os
from get_quake_data import get_quake_data
import settings

app = Sanic(__name__)
app.static('/static', settings.STATIC_DIR)


SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
async def index(request):
    template = open(os.path.join(SCRIPT_DIR, "index.html"))
    return html(template.read())

@app.route("/json")
async def quake_data(request):
    return json(get_quake_data())


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True, single_process=True)
