# exposabatier


# convert une image fix avec un fichier audio en mp3 avec l'audio en mp3

Exemple :  
`ffmpeg -loop 1 -i ManifesteGand.jpg -i ManifesteDLF.mp3 -c:v libx264 -tune stillimage -codec:a libmp3lame -qscale:a 5 -pix_fmt yuv420p -shortest out2.mp4`