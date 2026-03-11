# Movie Discovery App

A high-performance, full-stack mobile application built with **React Native** that empowers users to explore the vast world of cinema. By integrating the **TMDB API**, users can search for any film, while **Appwrite** handles the heavy lifting for secure user data and cloud storage.

---

## Features and Functionalities

* **Smart Movie Search:** Instant, real-time movie lookups powered by the extensive TMDB database.
* **Bookmark Favorites:** A dedicated "Saved" tab allows users to persist their favorite films for later viewing.
* **Dynamic Trending List:** An intelligent algorithm that automatically promotes movies based on global user search frequency.
* **Cloud Backend:** Built-in security and scalability using Appwrite for database management and asset storage.

---

## Tech Stack

* **Frontend:** React Native (TypeScript) & Expo
* **Backend:** [Appwrite](https://appwrite.io/) (Database & Storage)
* **External API:** [TMDB (The Movie Database) API](https://developer.themoviedb.org/docs)

---

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* An active **Appwrite** project and a **TMDB API Key**.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/movie-discovery-app.git
cd movie-discovery-app

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory. You will need to define your TMDB and Appwrite credentials:
```text
TMDB_API_KEY=your_tmdb_key
APPWRITE_ENDPOINT=your_appwrite_url
APPWRITE_PROJECT_ID=your_project_id

```


### Running the App

To start the Expo development server (for testing on the **Expo Go** app):

```bash
npx expo start

```

To create and run a local development build:

```bash
npx expo run:android

```

---
