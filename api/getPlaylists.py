import json
import os
from http.server import BaseHTTPRequestHandler
from pathlib import Path
from urllib import parse

from bs4 import BeautifulSoup
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def getPlaylistInfo(playlist):
  images_div = playlist.find('div', class_='d-cover__wrapper playlist-cover__wrapper')
  images = images_div.findAll('img', class_='playlist-cover__img deco-pane')

  src_list = []
  for img in images:
    src = img.get('src')
    src_list.append(src)

  title_div = playlist.find('div', class_='playlist__title deco-typo typo-main')
  title = title_div.get("title")
  link = title_div.find("a", 'd-link deco-link playlist__title-cover').get("href")

  return {'srcList': src_list, "title": title, "link": link}


def getYandexPlaylists(username):
  return [{'srcList': ['/blocks/playlist-cover/playlist-cover_like.png'], 'title': 'Мне нравится', 'link': '/users/v4dimgorbatov/playlists/3'}, {'srcList': ['//avatars.yandex.net/get-music-content/63210/c633ab03.a.1432493-1/100x100', '//avatars.yandex.net/get-music-content/6255016/4bf3d071.a.23147968-1/100x100', '//avatars.yandex.net/get-music-content/49876/7e9b8866.a.503984-1/100x100', '//avatars.yandex.net/get-music-content/49876/bd1e3f1a.a.2743861-1/100x100'], 'title': 'Веселый', 'link': '/users/v4dimgorbatov/playlists/1000'}, {'srcList': ['//avatars.yandex.net/get-music-content/49876/a9c29870.p.4481/200x200'], 'title': 'Лучшее: The Who', 'link': '/users/yamusic-bestsongs/playlists/4481'}]

  url = "https://music.yandex.ru/users/" + username + "/playlists"

  dotenv_path = Path('../.env')
  load_dotenv(dotenv_path=dotenv_path)
  
  chrome_options = Options()
  chrome_options.set_capability('browserless:token', os.getenv('BROWSERLESS_API_KEY'))
  chrome_options.add_argument("--no-sandbox")
  chrome_options.add_argument("--headless")

  try:    
    driver = webdriver.Chrome(
        command_executor='https://chrome.browserless.io/webdriver',
        options=chrome_options
    )
  
    driver.get(url)
    driver.implicitly_wait(3)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    driver.quit()

    playlists = soup.findAll('div', class_='playlist playlist_selectable')
    playlists_info = list(map(getPlaylistInfo,  playlists))

    return playlists_info

  except Exception as error:
      print("There was an error: %s" % error)

      return []


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = dict(parse.parse_qsl(parse.urlsplit(self.path).query))

        if ("username" in query):


          playlists = getYandexPlaylists(query["username"])

          self.send_response(200)
          self.send_header("Content-type", "application/json")
          self.end_headers()
          self.wfile.write(json.dumps({'data': playlists}).encode())

        else: 
          self.send_response(400)
          self.send_header("Content-type", "application/json")
          self.end_headers()  
          self.wfile.write(json.dumps({'message': "Invalid params"}).encode())

        return
