# exposabatier


# convert une image fix avec un fichier audio en mp3 avec l'audio en mp3
Dans le dossier où sont stockés le son et l'image, faire shift+clic droit sur le dossier , puis ouvrir la fenêtre Power shell ici. Coller les lignes ci-dessous :

Exemple :  
`ffmpeg -loop 1 -i textePages1bis.jpg -i traiteDLF-final.mp3 -c:v libx264 -tune stillimage -codec:a libmp3lame -qscale:a 5 -pix_fmt yuv420p -shortest lectureTraiteDLF3.mp4`

`ffmpeg -loop 1 -i Traite-Part5_1.jpg -i Titre5_FafouLove.wav -c:v libx264 -tune stillimage -codec:a libmp3lame -qscale:a 5 -pix_fmt yuv420p -shortest Traite_part5.mp4`