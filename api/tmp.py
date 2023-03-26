import json
from http.server import BaseHTTPRequestHandler
from urllib import parse
from bs4 import BeautifulSoup
from requests import get



def parser(username):
  url = "https://music.yandex.ru/users/" + username + "/playlists"
  response = get(url)

  html_soup = BeautifulSoup(response.text, 'html.parser')

  # page = html_soup.find('div', class_='page-users__section')
  # print("page", page)
  playlists = html_soup.findAll('a', class_='d-link deco-link playlist__title-cover')
  print(playlists)

  return len(playlists)





print('#Hello from python#')


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = dict(parse.parse_qsl(parse.urlsplit(self.path).query))

        print(query)

        if ("username" in query):
          print("Found")
          parsed = parser(query["username"])

          self.send_response(200)
          self.send_header("Content-type", "application/json")
          self.end_headers()
          self.wfile.write(json.dumps({'len': parsed}).encode())

        else: 
          print("Not found")
          self.send_response(400)
          self.send_header("Content-type", "application/json")
          self.end_headers()  
          self.wfile.write(json.dumps({'message': "Invalid params"}).encode())

        return
