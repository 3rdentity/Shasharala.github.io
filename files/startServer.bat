:: this file may be renamed and references to jar files or executables can be referenced through other directories
:: such as "C:\Users\username\Desktop\mcserver\minecraft_server.1.8.1.jar"
:: you may change the values after "-Xms" and "-Xmx" to reflect the minimum and maxium amounts of ram you want allocated, respectively
:: "G" denotes gigabytes while "m" denotes megabytes
title Minecraft
IF EXIST minecraft_server.1.8.1.exe (
javaw -jar -Xms1G -Xmx1G minecraft_server.1.8.1.exe
)
IF EXIST minecraft_server.1.8.1.jar (
java -jar -Xms1G -Xmx1G minecraft_server.1.8.1.jar nogui
)
