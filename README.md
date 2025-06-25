# Real_doc

This repository contains experimental projects. One of the projects is **TextFinder**, a simple web-based mobile application that uses the device camera to detect and search text in real time.

## TextFinder

TextFinder captures video from the camera, detects words using [Tesseract.js](https://github.com/naptha/tesseract.js), and draws red boxes around every word. A search box at the top allows filtering so only words containing the query are highlighted. For example, entering `C5` will highlight boxes that include `C5`.

### Running

Open `textfinder/index.html` in a modern browser (mobile or desktop). The browser will ask for camera permissions. Once granted, text boxes will appear over the video. Typing into the search box will filter the boxes by the provided term.

### Naming idea

A broad name for this application could be **"TextFinder"** or **"TextLens"**, which conveys text detection and search capabilities that might be used in practical scenarios or for patents.
