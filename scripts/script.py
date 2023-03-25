import sys
import logging
import random
import time
import asyncio
from bs4 import BeautifulSoup
from requests import get




async def parser():
  url = "https://music.yandex.ru/users/v4dimgorbatov/playlists"

  response = get(url)
        
  html_soup = BeautifulSoup(response.text, 'html.parser')

  # page = html_soup.find('div', class_='page-users__section')
  # print("page", page)
  playlists = html_soup.findAll('a', class_='d-link deco-link playlist__title-cover')

  print(len(playlists))
  return len(playlists)





print('#Hello from python#')
loop = asyncio.new_event_loop()
parsed = loop.run_until_complete(parser())

loop.close()

print('First param:'+sys.argv[1]+'#')
print('Second param:'+sys.argv[2]+'#')

sys.stdout.flush()