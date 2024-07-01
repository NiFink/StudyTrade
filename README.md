# StudyTrade SE3

## Description

A brief description of the project and its purpose.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Configuration](#configuration)
4. [Testing](#testing)
5. [Contributing](#contributing)
6. [License](#license)
7. [Authors](#authors)
8. [Version History](#version-history)
9. [Additional Information](#additional-information)

## Installation

### Prerequisites

- Java 17 or higher
- A current web browser

### Installation Guide

```bash
# Clone the repository using HTTPS
git clone https://gitlab.mi.hdm-stuttgart.de/nk150/studytrade-se3.git

# Clone the repository using SSH
git clone git@gitlab.mi.hdm-stuttgart.de:nk150/studytrade-se3.git

# Open Project
cd studytrade-se3

# Install dependencies for the frontend
cd studytrade-frontend
npm install

# Install dependencies for the backend
cd ../studytrade-backend
mvn install

```

## Usage

```bash
# Build Docker images and start containers (http://localhost:3000/)
cd ..
docker-compose up

# Stop and remove Docker containers and images
docker-compose down --rmi all -v

# Start the frontend app (http://localhost:3000/)
cd studytrade-frontend
npm start

# Start the backend app (http://localhost:8080/swagger-ui/index.html#/)
cd ../studytrade-backend
mvn spring-boot:run
```

## Configuration

### Configuration Options

- server.port: The port on which the application runs (default: 8080).
- spring.datasource.url: The URL of the database connection.
- spring.mail.host: The SMTP server host for sending emails.
- spring.mail.port: The SMTP server port for sending emails.

## Testing

### Test Guide

```bash
# Tests ausführen
# Run backend tests
cd studytrade-backend
mvn test

# Run frontend tests
cd ../studytrade-frontend
npm test
```

## Contributing

### Contribution Guidelines

- Create a pull request
- Follow the code style guidelines

### Reporting Issues

- Please report issues via email to the main authors.

## License

This project is reserved for use by the development team and the instructor only.

## Authors

### Main Authors:

- Jan Sander(js485@hdm-stuttgart.de),
- Nils Fink(nf056@hdm-stuttgart.de),
- Lisa Kohls(lk210@hdm-stuttgart.de),
- Niklas Kiess(nk150@hdm-stuttgart.de),
- Ryan Röhrich(rr062@hdm-stuttgart.de),
- Jessi Schmidt(js496@hdm-stuttgart.de)

## Version History

### v1.0.0

- Initial release

## Additional Information

- Wiki
