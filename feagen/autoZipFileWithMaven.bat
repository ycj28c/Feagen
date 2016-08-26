taskkill /f /t /im nw.exe
del version\app.nw /s /q
7z a -tzip version\app.nw css js temp apache-maven-3.3.3 icon.png index.html package.json
..\nw\nw.exe version\app.nw