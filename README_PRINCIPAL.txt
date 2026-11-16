ANALISTA PRO PC — APLICACIÓN DE ESCRITORIO PARA WINDOWS

Este proyecto convierte la edición PC v16 Offline que proporcionó el usuario
en una aplicación de escritorio de Windows.

QUÉ INCLUYE
- Analista Pro PC v16 Offline original, sin reescribir sus HTML.
- Inicio PC-only y selector PC-only.
- Ventana nativa de Windows con icono propio.
- Instalador Windows (.exe) y versión portable (.exe).
- Exportaciones guardadas en la carpeta Descargas de Windows.
- Bloqueo de conexiones HTTP/HTTPS/WebSocket para mantener el funcionamiento offline.
- Compilación automática en GitHub Actions para x64 e ia32.

COMPATIBILIDAD OBJETIVO
- Windows 7 SP1 / Windows 8 / Windows 8.1: Electron 22.3.27, en compilación x86 y x64.
- Windows 10 y Windows 11: el mismo programa también puede ejecutarse.
- Se generan artefactos x64 e ia32 para cubrir Windows de 32 y 64 bits.

AVISO IMPORTANTE SOBRE WINDOWS 7
Electron 22 es la última versión principal de Electron que admite Windows 7/8/8.1.
Esa rama dejó de recibir correcciones de seguridad en octubre de 2023. Por eso
esta compilación se plantea para una aplicación local sin conexión; no debe
utilizarse como navegador ni para abrir contenido web desconocido. Windows 7
también debe tener Service Pack 1 y actualizaciones necesarias del sistema.

CÓMO GENERAR LOS EXE
1. Crea un repositorio NUEVO y privado en GitHub, por ejemplo:
   analista-pro-pc-windows
2. Extrae este ZIP.
3. Sube a la raíz del repositorio el contenido extraído:
   .github/, assets/, www/, main.js y package.json.
4. Si GitHub no sube .github, créala manualmente:
   Add file > Create new file
   Nombre: .github/workflows/build-windows.yml
   Pega el contenido de COPIAR_WORKFLOW_WINDOWS.txt y guarda con Commit changes.
5. En GitHub abre Actions.
6. Ejecuta "Build Analista Pro PC for Windows" con Run workflow.
   También puede iniciar automáticamente al hacer push a main.
7. Al terminar, descarga los dos artifacts:
   Analista-Pro-PC-Windows-x64
   Analista-Pro-PC-Windows-ia32
8. Extrae el artifact correspondiente:
   - x64: para Windows de 64 bits.
   - ia32: para Windows de 32 bits.
9. Dentro encontrarás un instalador y una versión portable.

INSTALACIÓN
- Instalador: ejecuta Analista-Pro-PC-Instalador-1.0.0-x64.exe (o ia32).
- Portable: ejecuta Analista-Pro-PC-Portable-1.0.0-x64.exe (o ia32).
No necesitas instalar Node.js, Electron ni Android SDK en el computador final.

PRUEBAS REALIZADAS SOBRE EL PROYECTO
- Integridad del ZIP original.
- Sintaxis JavaScript de los 10 bloques inline de Analista_Pro_PC.html.
- Ausencia de scripts, imágenes o enlaces externos HTTP en los HTML principales.
- Sintaxis de main.js y validez de package.json / workflow YAML.
- El proyecto de Windows se debe compilar en GitHub Actions y probar en equipos reales
  con Windows 7 SP1, Windows 10 y Windows 11 antes de distribuirlo ampliamente.

NOTA
El archivo que se genera en este entorno es el proyecto fuente listo para compilar,
no un .exe ya compilado. GitHub Actions construirá los ejecutables de Windows.


LOGO
- Esta edición usa exactamente el mismo logotipo base de la APK Android (ic_launcher).

ICONO WINDOWS - CORRECCION 1.0.2
El archivo assets/analista-pro.ico ahora incluye una capa real de 256x256 píxeles, requisito de electron-builder.
