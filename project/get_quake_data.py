import requests
import datetime as date


def get_quake_data():
    """Get earthquake data for the PNW region over the last week."""

    uri = 'http://earthquake.usgs.gov/fdsnws/event/1/query'

    today = date.datetime.now()
    last_week = date.datetime.now() - date.timedelta(days=7)
    today_str = str(today.year) + '-' + str(today.month) + '-' + str(today.day)
    last_week_str = str(last_week.year) + '-' + str(last_week.month) + '-' + str(last_week.day)
    lat_min = 45
    lat_max = 50
    lon_min = -126
    lon_max = -116
    payload = {
        'format': 'geojson',
        'starttime': last_week_str,
        'endtime': today_str,
        'minlatitude': lat_min,
        'maxlatitude': lat_max,
        'minlongitude': lon_min,
        'maxlongitude': lon_max,
        }

    response = requests.get(uri, params=payload)

    return response.json()
