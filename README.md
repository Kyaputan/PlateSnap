# PlateSnap: License Plate Recognition System

PlateSnap is a full-stack application designed for real-time license plate recognition. It combines a powerful Python backend for image processing with a modern React frontend for user interaction.

## Features

- **License Plate Detection:** Utilizes a YOLOv8 model to accurately detect license plates in uploaded images.
- **Optical Character Recognition (OCR):** Extracts alphanumeric characters from the detected license plates.
- **RESTful API:** A FastAPI-based backend that exposes endpoints for image upload and processing.
- **User-Friendly Interface:** A React and Tailwind CSS frontend for easy image submission and viewing results.
- **Containerized Deployment:** Docker support for easy setup and deployment of the backend service.

## Technology Stack

### Backend

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database:** MySQL (via PyMySQL)
- **Migrations:** [Alembic](https://alembic.sqlalchemy.org/)
- **CV & OCR:**
  - [Ultralytics YOLOv8](https://ultralytics.com/)
  - [OpenCV](https://opencv.org/)
  - [EasyOCR](https://github.com/JaidedAI/EasyOCR)
- **Server:** [Uvicorn](https://www.uvicorn.org/)
- **Containerization:** [Docker](https://www.docker.com/)

### Frontend

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v18 or later) and npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd PlateSnap
    ```

2.  **Backend Setup (with Docker):**

    - Navigate to the `Backend` directory.
    - Create a `.env` file from the example and fill in your database credentials.
    - Run the services using Docker Compose:
      ```bash
      cd Backend
      docker-compose up --build
      or
      uvicorn app.main:app --reload
      ```
    - The backend API will be available at `http://localhost:8000`.

3.  **Frontend Setup:**

    - Navigate to the `Frontend` directory.
    - Install the dependencies:
      ```bash
      cd Frontend
      npm install
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```
    - The frontend will be available at `http://localhost:5173`.

## API Usage

- **Endpoint:** `POST /api/v1/plates/detect`
- **Request:** Send a `POST` request with a `multipart/form-data` body, including the image file under the key `file`.
- **Response:** Returns a JSON object with the detected license plate text and other details.
