'use strict';

const { app, BrowserWindow, Menu, session, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { fileURLToPath } = require('url');

const WEB_ROOT = path.join(__dirname, 'www');
let mainWindow = null;

function isInside(parent, candidate) {
  const relative = path.relative(path.resolve(parent), path.resolve(candidate));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function configureOfflineMode() {
  const ses = session.defaultSession;

  // Analista Pro is a local/offline application. Block outgoing web requests.
  ses.webRequest.onBeforeRequest(
    { urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] },
    (_details, callback) => callback({ cancel: true })
  );

  // Save JPG/MP4 exports directly in the user's Downloads folder.
  ses.on('will-download', (_event, item) => {
    const downloadsDir = app.getPath('downloads');
    const originalName = item.getFilename() || 'Analista-Pro-export';
    const extension = path.extname(originalName);
    const basename = path.basename(originalName, extension);
    let destination = path.join(downloadsDir, originalName);
    let counter = 1;

    while (fs.existsSync(destination)) {
      destination = path.join(downloadsDir, `${basename} (${counter})${extension}`);
      counter += 1;
    }

    item.setSavePath(destination);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Analista Pro PC',
    width: 1440,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    center: true,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#061329',
    icon: path.join(__dirname, 'assets', 'analista-pro.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      spellcheck: false
    }
  });

  // The four local HTML pages may navigate among themselves, but nothing else.
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    try {
      const parsed = new URL(navigationUrl);
      if (parsed.protocol !== 'file:') {
        event.preventDefault();
        return;
      }

      const destination = fileURLToPath(parsed);
      if (!isInside(WEB_ROOT, destination)) {
        event.preventDefault();
      }
    } catch (_error) {
      event.preventDefault();
    }
  });

  mainWindow.webContents.on('will-attach-webview', (event) => {
    event.preventDefault();
  });

  mainWindow.webContents.on('did-fail-load',
    (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      if (isMainFrame && errorCode !== -3) {
        dialog.showErrorBox(
          'No se pudo abrir Analista Pro',
          `${errorDescription}\n${validatedURL}`
        );
      }
    }
  );

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open the PC-only start screen. Its links lead to the PC selector and PC tool.
  mainWindow.loadFile(path.join(WEB_ROOT, 'index.html'));
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.analistapro.pc');
  Menu.setApplicationMenu(null);
  configureOfflineMode();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
