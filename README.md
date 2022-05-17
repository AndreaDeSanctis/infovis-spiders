# infovis-spiders
Repo about the first project of InfoVis course, Roma3 AA 21/22

Assignment:
Disegna 10 ragni distribuiti randomicamente nell'area di disegno (è sufficiente la silhouette).
Cliccando sullo sfondo i ragni si muovono rapidamente in quattro configurazioni diverse consecutive che
somigliano alle lettere "C" "I" "A" e "O", per poi tornare ad una configurazione random.
La posizione dei ragni nelle quattro configurazioni somiglianti a lettere è descritta in formato json.
Cliccando su un ragno, invece, questo rimane schiacciato e non partecipa più alla composizione delle lettere.

Test:
Tested and working inside localhost python3 server

Note:
Per quanto riguarda la randomizzazione della posizione, ho preferito utilizzare comunque una configurazione
fissa, a cui poi si va a moltiplicare un coefficiente di randomizzazione ad ogni ciclo, poichè diversamente
ho riscontrato alcuni problemi nel disegno dei ragni