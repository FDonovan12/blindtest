
from __future__ import unicode_literals

import yt_dlp
import json
import re
import os

def slugify(originalTitle):
    lowercaseFilename = originalTitle.lower()
    whitoutMultipleSpace = re.sub('[^a-z0-9]+', ' ', lowercaseFilename)
    strippedFilename = whitoutMultipleSpace.strip()
    slugifyFilename = strippedFilename.replace(" ", "-")
    
    return slugifyFilename

def extract_title(youtube_url):
    with yt_dlp.YoutubeDL({'quiet': True}) as ydl:
        info_dict = ydl.extract_info(youtube_url, download=False)
        title = info_dict.get('title', 'unknown_title')
        custom_filename = slugify(title)
        return custom_filename

def download_one_music(youtube_url):
    print("download_one_music")
    custom_filename = extract_title(youtube_url)
    path_for_json = os.path.join('current/music/', custom_filename + ".mp3")
    download_path = os.path.join("./../current/music/" , custom_filename)
    
    if os.path.exists(download_path + ".mp3"):
        print("File already exists")
        return path_for_json
        
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': download_path,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(youtube_url, download=True)
    return path_for_json

def download_all_musics(jsonFileName):
    f = open(jsonFileName)
    data = json.load(f)

    blindtest = data["blindtest"]
    sections = blindtest["sections"]
    for section in sections:
        musics = section["musics"]
        for music in musics:
            try:
                print(f'{music = }')
                path = download_one_music(music["link"])
                music["path"] = path
                print(f'{path = }')
                
            except:
                print("error link")
    with open(jsonFileName, "w") as jsonFile:
        json.dump(data, jsonFile)
    f.close()
    jsonFile.close()

filename = "./../current/data.json"
download_all_musics(filename)