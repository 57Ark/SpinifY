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


def getSongs(username, playlistId,):
  return [{'id': '20479652', 'name': 'Starman из фильма «Марсианин»', 'artist': 'David Bowie'}, {'id': '220497', 'name': 'People Are Strange', 'artist': 'The Doors'}, {'id': '52869001', 'name': 'Believer', 'artist': 'Puddles Pity Party'}, {'id': '44223148', 'name': 'Sepia', 'artist': 'Indigo Jam Unit'}, {'id': '94298671', 'name': 'Два стула', 'artist': 'Научно-технический рэп'}, {'id': '77880662', 'name': 'Отчим (Выпуск №1)', 'artist': 'Аудиожурнал "Твой дед"'}, {'id': '85955468', 'name': 'Просто наркотики', 'artist': 'БЫДЛОЦЫКЛ'}, {'id': '66501755', 'name': 'Goldberg Variations, BWV 988 : Variatio 29. A 1 2 Clav. - O vero', 'artist': 'Glenn Gould'}, {'id': '105560954', 'name': 'Мой брат', 'artist': 'Джанки Джин'}, {'id': '99569576', 'name': 'Дайте поспать', 'artist': 'Ростислав Чебыкин'}, {'id': '14688929', 'name': 'Fly Away', 'artist': 'Lenny Kravitz'}, {'id': '34339589', 'name': "You're Dead из фильма «Реальные упыри»", 'artist': 'Norma Tanega'}, {'id': '75132770', 'name': 'Невский проспект', 'artist': 'Псой Короленко'}, {'id': '81816919', 'name': 'For The Damaged Coda - Evil Morty Theme Song (From "Rick And Morty")', 'artist': 'Geek Music'}, {'id': '799663', 'name': 'Les Marquises', 'artist': 'Jacques Brel'}, {'id': '103889955', 'name': 'Чё то принимали', 'artist': 'DJ ПЕРЕКРЫТ'}, {'id': '23526701', 'name': 'Вещества', 'artist': 'Ростислав Чебыкин'}, {'id': '101746899', 'name': 'Моя бабушка постит в Фейсбук', 'artist': 'Дореволюціонный совѣтчикъ'}, {'id': '79467339', 'name': 'Nikolai Reptile', 'artist': 'Shadowax'}, {'id': '94756211', 'name': 'Иван Кузьмич', 'artist': 'Сержант'}, {'id': '81244880', 'name': 'No Homo', 'artist': 'Xarakter'}, {'id': '97258946', 'name': 'Плыли мы по морю', 'artist': 'lyrikitty'}, {'id': '101341982', 'name': 'Гостиница «Кисловодская»', 'artist': 'Дореволюціонный совѣтчикъ'}, {'id': '103035569', 'name': 'Света и Олег', 'artist': 'ДИСКОПРОВОКАЦИЯ'}, {'id': '83047449', 'name': 'Darkwing Duck Main Theme (From "Darkwing Duck")', 'artist': 'Geek Music'}, {'id': '103096665', 'name': 'Вова', 'artist': 'ДИСКОПРОВОКАЦИЯ'}, {'id': '50221616', 'name': 'Blood And Rockets: Movement I / Saga of Jack Parsons - Movement II / Too The Moon', 'artist': 'The Claypool Lennon Delirium'}, {'id': '1171318', 'name': 'Amish Paradise Parody of "Gangsta\'s Paradise" by Coolio', 'artist': '"Weird Al" Yankovic'}, {'id': '60448495', 'name': 'Лалахей', 'artist': 'Всеволод Старозубов'}, {'id': '5881292', 'name': 'Frolic (Curb Your Enthusiasm Theme)', 'artist': 'Luciano Michelini'}, {'id': '15681862', 'name': 'Goeiemorgen, morgen Origineel versie', 'artist': 'Nicole & Hugo'}, {'id': '102978538', 'name': 'Кавказское диско', 'artist': 'ДИСКОПРОВОКАЦИЯ'}, {'id': '98147430', 'name': 'Piesek', 'artist': 'BULSJARZ'}, {'id': '41091008', 'name': 'Jamaican Rhapsody', 'artist': 'Ronald Reggae'}, {'id': '41026502', 'name': 'Cantina Band', 'artist': 'John Towner Williams'}, {'id': '20644711', 'name': 'Taj Mahal', 'artist': 'Broncho'}, {'id': '91300923', 'name': 'Господь Господь Иисус Христос', 'artist': 'Павел Сатаненко'}, {'id': '101554408', 'name': 'KOT KOT KOT feat. TommyGun & Wrona', 'artist': 'BULSJARZ'}, {'id': '78584412', 'name': 'Бібліотека', 'artist': 'Колос'}, {'id': '85472914', 'name': 'Believer', 'artist': 'Sandaru Sathsara'}, {'id': '53563596', 'name': 'Mr. Sandman Original Recording Remastered', 'artist': 'The Chordettes'}, {'id': '28813244', 'name': 'Мейн-кун', 'artist': 'ILWT'}, {'id': '60102026', 'name': 'Пшлнхй', 'artist': 'Пионерлагерь Пыльная Радуга'}, {'id': '84747537', 'name': 'Dance Monkey', 'artist': 'Sandaru Sathsara'}, {'id': '95561698', 'name': 'Новогодний Вадим', 'artist': 'ЭЛЕКТРОСЛАБОСТЬ'}, {'id': '39848801', 'name': 'Russian Government Process', 'artist': 'Ylvis'}, {'id': '84040776', 'name': 'Gdzie jest biały węgorz? (Zejśćie)', 'artist': 'Cypis'}, {'id': '103043607', 'name': 'Орда', 'artist': 'ДИСКОПРОВОКАЦИЯ'}, {'id': '5989554', 'name': 'Türk Marşı', 'artist': 'Ceza'}, {'id': '52434334', 'name': 'Mundian to Bach Ke', 'artist': 'Panjabi MC'}, {'id': '7352852', 'name': 'Mama El Baion', 'artist': 'Maria Zamora Y Sus Machachos'}, {'id': '69428683', 'name': 'Fuck The World', 'artist': 'Richard Cheese'}, {'id': '28936944', 'name': 'Artsakh', 'artist': 'Serj Tankian'}, {'id': '214348', 'name': 'Après Moi на стихи Б. Пастернака', 'artist': 'Regina Spektor'}, {'id': '77883356', 'name': 'PUTIN', 'artist': 'Cartel de Puta'}, {'id': '59918330', 'name': 'Ach so gern', 'artist': 'Lindemann'}, {'id': '20645678', 'name': 'The Hunter', 'artist': 'Slaves'}, {'id': '257638', 'name': 'Nightclubbing', 'artist': 'Iggy Pop'}, {'id': '44139201', 'name': 'I Bet You Look Good On The Dancefloor', 'artist': 'Arctic Monkeys'}, {'id': '17191025', 'name': 'Light My Fire', 'artist': 'The Doors'}, {'id': '37108185', 'name': 'Ashes to Ashes 2017 Remaster', 'artist': 'David Bowie'}, {'id': '219989', 'name': 'Psycho Killer 2005 Remaster', 'artist': 'Talking Heads'}, {'id': '330819', 'name': 'Karma Police', 'artist': 'Radiohead'}, {'id': '96089', 'name': 'Song 2', 'artist': 'Blur'}, {'id': '15916904', 'name': 'Put Your Hand On My Shoulder', 'artist': 'Paul Anka'}, {'id': '15561883', 'name': 'Shut your mouth when you sneeze', 'artist': "Screamin' Jay Hawkins"}, {'id': '29238698', 'name': 'Смельчак и ветер', 'artist': 'Король и Шут'}, {'id': '103844', 'name': 'Pussy', 'artist': 'Rammstein'}, {'id': '30213653', 'name': 'Властелин колец', 'artist': 'Жуки'}, {'id': '91644801', 'name': 'Ёбу дал', 'artist': 'Пневмослон'}, {'id': '45366285', 'name': 'Hasta Siempre Remastered', 'artist': 'Carlos Puebla'}, {'id': '249581', 'name': 'Mambo Italiano', 'artist': 'Dean Martin'}, {'id': '42549779', 'name': 'G.O.A.T.', 'artist': 'Polyphia'}, {'id': '42549544', 'name': 'O.D.', 'artist': 'Polyphia'}, {'id': '15615914', 'name': 'Traditional: Abballati', 'artist': 'Roberto Alagna'}, {'id': '50055860', 'name': 'Waltz No.2', 'artist': 'Cihat Askin'}, {'id': '45366286', 'name': 'Y en Eso Llego Fidel Remastered', 'artist': 'Carlos Puebla'}, {'id': '43930894', 'name': 'Ich geh heut nicht mehr tanzen', 'artist': 'AnnenMayKantereit'}, {'id': '12435530', 'name': '7:40', 'artist': "Matt Temkin's Yiddishe Jam Band"}, {'id': '4464306', 'name': "Tu Vuo Fa L'Americano", 'artist': 'Renato Carosone'}, {'id': '27037161', 'name': 'Улица Ленина', 'artist': 'Ноль'}, {'id': '3507932', 'name': 'Por Una Cabeza из фильма «Прекрасная эпоха»', 'artist': 'Quintango'}, {'id': '8168590', 'name': 'Утомлённое солнце', 'artist': 'Павел Михайлов'}, {'id': '33406388', 'name': 'Heroin', 'artist': 'The Tiger Lillies'}, {'id': '23729054', 'name': 'Caravana Twist', 'artist': 'Bill Haley'}, {'id': '6284462', 'name': 'Jožin z bažin', 'artist': 'Ivan Mládek'}, {'id': '4428061', 'name': 'Miserlou из фильма «Криминальное чтиво»', 'artist': 'Best Movie Soundtracks'}, {'id': '107479381', 'name': 'Снова пьют здесь, дерутся и плачут…', 'artist': 'Монгол Шуудан'}, {'id': '105408383', 'name': 'Колыбельная', 'artist': 'Би-2'}, {'id': '10892', 'name': 'What A Wonderful World', 'artist': 'Louis Armstrong'}, {'id': '24431206', 'name': 'Sing, Sing, Sing With a Swing', 'artist': 'Benny Goodman and His Orchestra'}, {'id': '797090', 'name': 'Love Theme From "The Godfather" из фильма «Крестный отец»', 'artist': 'Nino Rota'}, {'id': '19214243', 'name': 'House of Horrors', 'artist': 'Merv Griffin'}, {'id': '5249644', 'name': 'Mambo!: Gopher', 'artist': 'Yma Sumac'}, {'id': '36887039', 'name': 'Suite No. 2 in B Minor, BWV 1067: VII. Badinerie', 'artist': 'Bath Festival Orchestra'}, {'id': '4334770', 'name': 'Hava Nagila', 'artist': 'The Klezmer Lounge Band'}, {'id': '17707650', 'name': "Beggin'", 'artist': 'The Four Seasons'}, {'id': '15536929', 'name': 'Hit the Road Jack Version originale remasterisée', 'artist': 'Ray Charles'}, {'id': '20827818', 'name': 'Mahalageasca', 'artist': 'Bubamara Brass Band'}, {'id': '271253', 'name': 'Non, Je Ne Regrette Rien', 'artist': 'Édith Piaf'}, {'id': '22583784', 'name': 'Chardash', 'artist': 'International String Trio'}, {'id': '15095324', 'name': 'Masquerade, Symphonic Suite: I. Waltz', 'artist': 'Арам Ильич Хачатурян'}, {'id': '82198098', 'name': "You Know I'm No Good Live At Porchester Hall / 2007", 'artist': 'Amy Winehouse'}, {'id': '18006955', 'name': 'Тореро из «Кармен-сюиты»', 'artist': 'Геннадий Рождественский'}, {'id': '30633615', 'name': "California Dreamin'", 'artist': 'The Mamas & The Papas'}, {'id': '5818003', 'name': 'Snowstorm II. Waltz', 'artist': 'St. Petersburg Orchestra of the State Hermitage Museum Camerata'}, {'id': '6248597', 'name': 'Toccata y Fuga en Re Minor, BWV 565', 'artist': 'Guy Lennox'}, {'id': '16453924', 'name': 'Hungarian Dances, WoO 1: No. 5 in G Minor', 'artist': 'Иоганнес Брамс'}, {'id': '7825313', 'name': 'Polka Italienne: Original Version for Piano Duet', 'artist': 'Martin Jones'}, {'id': '15512620', 'name': ' Symphony No.5 In C Minor, Op.67 - 1. Allegro con brio', 'artist': 'Berliner Philharmoniker'}, {'id': '1508617', 'name': 'Caprice No. 24', 'artist': 'Никколо Паганини'}, {'id': '51780848', 'name': 'The Nutcracker March', 'artist': 'Symphony Orchestra of the Russian State TV & Radio Centre'}, {'id': '30998788', 'name': 'Piano Concerto No. 1 In B-Flat Minor, Op. 23: I. Allegro non troppo e molto maestoso - Allegro con spirito', 'artist': 'Russian State Symphony Orchestra'}, {'id': '1506557', 'name': 'La Donna È Mobile', 'artist': 'Джузеппе Верди'}, {'id': '110219', 'name': 'Москва на стихи С. Есенина', 'artist': 'Монгол Шуудан'}, {'id': '67733714', 'name': 'Баста раста', 'artist': 'Борис Гребенщиков'}, {'id': '9570', 'name': 'I Got You (I Feel Good) из фильма «Джеймс Браун: Путь наверх»', 'artist': 'James Brown'}, {'id': '24623536', 'name': 'Вариации на цыганские темы', 'artist': 'Владимир Высоцкий'}, {'id': '5026692', 'name': 'Carmen / Habanera', 'artist': 'Opera Ensemble'}, {'id': '12392', 'name': "You Know I'm No Good Ghostface UK Version", 'artist': 'Amy Winehouse'}, {'id': '15696009', 'name': 'Traditional: Ochi tchorniye - Caminito - La vie en rose Live', 'artist': 'Jose Carreras'}, {'id': '44547778', 'name': 'Requiem in D Minor, K. 626: III. Sequenz "Lacrimosa"', 'artist': 'musicAeterna'}, {'id': '4318462', 'name': 'Vesti la giubba I Pagliacci Atto I', 'artist': 'Luciano Pavarotti'}, {'id': '1122220', 'name': 'Una Furtiva Lagrima', 'artist': 'Luciano Pavarotti'}, {'id': '21645924', 'name': 'Puccini: Turandot / Act 3 - "Nessun dorma!"', 'artist': 'Luciano Pavarotti'}, {'id': '800204', 'name': "Di Capua, Mazzucchi: 'O sole mio (Arr. Chiaramello)", 'artist': 'Luciano Pavarotti'}, {'id': '73075', 'name': 'Donizetti: L\'elisir d\'amore / Act II - "Una furtiva lagrima"', 'artist': 'Luciano Pavarotti'}, {'id': '36818084', 'name': 'Puccini: Tosca / Act 3 - "E lucevan le stelle"', 'artist': 'Luciano Pavarotti'}, {'id': '800207', 'name': 'Revaux: My Way', 'artist': 'Luciano Pavarotti'}, {'id': '800215', 'name': 'Caruso', 'artist': 'Luciano Pavarotti'}, {'id': '73065', 'name': 'Schubert: Ave Maria, D. 839 (Arr. Gamley)', 'artist': 'Luciano Pavarotti'}, {'id': '15736187', 'name': 'Dalla: Caruso', 'artist': 'Luciano Pavarotti'}, {'id': '27037167', 'name': 'Песня о настоящем индейце', 'artist': 'Ноль'}, {'id': '84578171', 'name': 'Zimmer', 'artist': 'Provinz'}, {'id': '46624179', 'name': 'Синий троллейбус', 'artist': 'Радиопомехи'}, {'id': '17887641', 'name': 'Вечная молодость', 'artist': 'Чиж & Co'}, {'id': '2192795', 'name': 'Забавы', 'artist': 'Мумий Тролль'}, {'id': '27037156', 'name': 'Иду, курю', 'artist': 'Ноль'}, {'id': '79292625', 'name': 'Заебался улыбаться', 'artist': 'Радиопомехи'}, {'id': '72261300', 'name': 'Trigger Of Love', 'artist': 'JAWNY'}, {'id': '1697028', 'name': 'Requiem: Lacrimosa', 'artist': 'Вольфганг Амадей Моцарт'}, {'id': '27522222', 'name': 'Lemon Tree', 'artist': "Fool's Garden"}, {'id': '555314', 'name': 'The Ballad Of Chasey Lain', 'artist': 'Bloodhound Gang'}, {'id': '18857', 'name': 'The Real Slim Shady', 'artist': 'Eminem'}, {'id': '148340', 'name': "Road Trippin'", 'artist': 'Red Hot Chili Peppers'}, {'id': '2347643', 'name': 'Go Down Moses', 'artist': 'Louis Armstrong'}, {'id': '656525', 'name': 'Bamboleo Remix', 'artist': 'Musica en Español'}, {'id': '64220', 'name': 'Wake Up Call', 'artist': 'Maroon 5'}, {'id': '152494', 'name': 'Fly Me To The Moon', 'artist': 'Frank Sinatra'}, {'id': '58511178', 'name': 'Gitar', 'artist': 'Пётр Налич'}, {'id': '49198563', 'name': 'What a Life из фильма «Ещё по одной»', 'artist': 'Scarlet Pleasure'}, {'id': '98548516', 'name': 'L’enfer', 'artist': 'Stromae'}, {'id': '31635004', 'name': 'Cancion del Mariachi', 'artist': 'Antonio Banderas'}, {'id': '95463168', 'name': 'Just The Two of Us', 'artist': 'Kauai45'}, {'id': '1124102', 'name': 'Happy Together', 'artist': 'The Turtles'}, {'id': '3654530', 'name': 'Dance Macabre', 'artist': 'Камиль Сен-Санс'}, {'id': '20007923', 'name': 'Someone New', 'artist': 'Hozier'}, {'id': '93835151', 'name': 'Tell It To My Heart', 'artist': 'Meduza'}, {'id': '62302144', 'name': 'Ausgehen', 'artist': 'AnnenMayKantereit'}, {'id': '54516116', 'name': "Tom's Diner", 'artist': 'AnnenMayKantereit'}, {'id': '110472', 'name': 'Москва', 'artist': 'Монгол Шуудан'}, {'id': '59133873', 'name': 'Маленькая девочка', 'artist': 'Крематорий'}, {'id': '27037175', 'name': 'Человек и кошка', 'artist': 'Ноль'}, {'id': '28123186', 'name': 'Как на войне', 'artist': 'Агата Кристи'}, {'id': '29238719', 'name': 'Тень 6. Фред', 'artist': 'Король и Шут'}, {'id': '1703893', 'name': 'Paint It Black', 'artist': 'The Rolling Stones'}, {'id': '25279881', 'name': 'Back To Black Radio Edit', 'artist': 'Amy Winehouse'}, {'id': '10554215', 'name': 'Papaoutai', 'artist': 'Stromae'}, {'id': '18860', 'name': 'Lose Yourself из фильма «8 миля»', 'artist': 'Eminem'}, {'id': '28421147', 'name': 'Переплетено', 'artist': 'Oxxxymiron'}, {'id': '33792664', 'name': 'Гандбол', 'artist': 'Сплин'}, {'id': '32656004', 'name': 'Русский рок', 'artist': 'Валентин Стрыкало'}, {'id': '23559960', 'name': 'Stressed Out', 'artist': 'twenty one pilots'}, {'id': '63464041', 'name': 'Chandelier', 'artist': 'Damien Rice'}, {'id': '17079396', 'name': 'Take Me To Church', 'artist': 'Hozier'}, {'id': '10906', 'name': "California Dreamin' из фильма «Форрест Гамп»", 'artist': 'The Mamas & The Papas'}, {'id': '148345', 'name': 'Californication', 'artist': 'Red Hot Chili Peppers'}, {'id': '694683', 'name': 'Highway to Hell', 'artist': 'Oz Rocks'}, {'id': '53412', 'name': 'Come As You Are', 'artist': 'Nirvana'}, {'id': '137670', 'name': "Gangsta's Paradise", 'artist': 'Coolio'}, {'id': '296299', 'name': 'Personal Jesus Live', 'artist': 'Depeche Mode'}, {'id': '358465', 'name': 'Feel Good Inc.', 'artist': 'Gorillaz'}, {'id': '6705392', 'name': 'Seven Nation Army', 'artist': 'The White Stripes'}, {'id': '26219985', 'name': 'Скованные одной цепью', 'artist': 'Nautilus Pompilius'}, {'id': '2758009', 'name': 'The Show Must Go On Remastered 2011', 'artist': 'Queen'}, {'id': '458529', 'name': 'Take on Me', 'artist': 'a-ha'}, {'id': '362085', 'name': 'Space Oddity 2009 Remastered Version', 'artist': 'David Bowie'}, {'id': '330765', 'name': 'Creep Explicit', 'artist': 'Radiohead'}, {'id': '103645167', 'name': 'ОКО', 'artist': 'pyrokinesis'}, {'id': '936612', 'name': 'Verbatim', 'artist': 'Mother Mother'}, {'id': '565378', 'name': 'Hay Loft', 'artist': 'Mother Mother'}, {'id': '62554717', 'name': 'Люди', 'artist': 'Дайте танк (!)'}, {'id': '43945741', 'name': 'Пластинки', 'artist': 'Дурной Вкус'}]

  url = "https://music.yandex.ru/users/" + username + "/playlists/" + playlistId

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
          self.end_headers()
          self.wfile.write(json.dumps({'data': songs}).encode())

        else: 
          self.send_response(400)
          self.send_header("Content-type", "application/json")
          self.end_headers()  
          self.wfile.write(json.dumps({'message': "Invalid params"}).encode())

        return
