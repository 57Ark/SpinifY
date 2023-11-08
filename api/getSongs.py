import json
import os
import time
from http.server import BaseHTTPRequestHandler
from pathlib import Path
from urllib import parse

from bs4 import BeautifulSoup
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By


def getSongInfo(song_div):
  id = song_div.get('data-item-id')
  name = song_div.find('div', class_='d-track__name').get("title")
  artist = song_div.find('div', class_='d-track__meta').find("a", class_="deco-link deco-link_muted").get("title")

  return {"id": id, "name": name, "artist": artist}


def getSongs(username, playlistId):
  url = "https://music.yandex.ru/users/" + username + "/playlists/" + playlistId

  dotenv_path = Path('../.env')
  load_dotenv(dotenv_path=dotenv_path)
  
  chrome_options = webdriver.ChromeOptions()
  chrome_options.set_capability('browserless:token', os.getenv('BROWSERLESS_API_KEY'))
  chrome_options.add_argument("--no-sandbox")
  chrome_options.add_argument("--headless")

  try:    
    driver = webdriver.Remote(
        command_executor='https://chrome.browserless.io/webdriver',
        options=chrome_options
    )
  
    driver.get(url)
    driver.implicitly_wait(3)

    song_id_set = set()
    song_list = []
    last_id = ""
    
    error_count = 0
    songs_count = 0

    while True:
      try:
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        div_list = soup.findAll('div', class_='d-track typo-track d-track_selectable d-track_with-cover')


        for i in range(0, len(div_list)):
          song_info = getSongInfo(div_list[i])
          id = song_info["id"]
          if not (id in song_id_set):
            song_list.append(song_info)
          song_id_set.add(id)
          if i == len(div_list) - 1:
            last_id = id
   
        ActionChains(driver).move_to_element(driver.find_element(By.CSS_SELECTOR, "div[data-item-id='" + last_id + "']")).perform()
        time.sleep(3)
          
        if (songs_count == len(song_list))  or (driver.execute_script("return window.scrollY + window.innerHeight") >= driver.execute_script("return document.body.scrollHeight")):
            break

        songs_count = len(song_list)

      except Exception as error:
        print("There was an error: %s" % error)
        if error_count >= 10: 
          return []
        
        error_count += 1
        time.sleep(3)

    driver.quit()

    print(songs_count)
    return list(song_list)

  except Exception as error:
      print("There was an error: %s" % error)

      return []



class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = dict(parse.parse_qsl(parse.urlsplit(self.path).query))

        if ("playlistId" in query and "username" in query):


          songs = getSongs(query["username"], query["playlistId"])

          self.send_response(200)
          self.send_header("Content-type", "application/json")
          self.send_header("Cache-Control", "max-age=1, stale-while-revalidate=86400")
          self.end_headers()
          self.wfile.write(json.dumps({'data': songs}).encode())

        else: 
          self.send_response(400)
          self.send_header("Content-type", "application/json")
          self.send_header("Cache-Control", "max-age=1, stale-while-revalidate=86400")
          self.end_headers()  
          self.wfile.write(json.dumps({'message': "Invalid params"}).encode())

        return
