
from __future__ import unicode_literals

import yt_dlp
import json

def dl_music(youtubeUrls):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': './../current/music/%(title)s.%(ext)s',  # Nom du fichier de sortie
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(youtubeUrls)

# dl_music(["https://www.youtube.com/watch?v=NaFd8ucHLuo&list=LRYR2yAPC69L3iw0uOffKDj0J0O8kUhuY8Lnd&index=54","https://www.youtube.com/watch?v=thOifuHs6eY"])

def returnAllYoutubeLink(jsonFileName):
    f = open(jsonFileName)
    data = json.load(f)

    blindtest = data["blindtest"]
    sections = blindtest["sections"]
    musicLinkTab = []
    for section in sections:
        musics = section["musics"]
        for music in musics:
            try:
                musicLinkTab.append(music["link"])
            except:
                print("error link")
    print(f'{musicLinkTab = }')
    print("musicLinkTab =",musicLinkTab)
    
    f.close()
    return musicLinkTab

def dlAllMusic(jsonFileName):
    musicLinkTab = returnAllYoutubeLink(jsonFileName)
    dl_music(musicLinkTab)

dlAllMusic("./../current/data.json")