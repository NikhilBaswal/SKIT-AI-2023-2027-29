# Gram Panchayat Water O&M Management System

A role-based web platform enabling Gram Panchayats to digitally monitor daily
Operation & Maintenance (O&M) of rural piped water supply systems.

## Tech Stack
- **Frontend:** React.js, HTML5, CSS3, JavaScript
- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA, JDBC
- **Database:** PostgreSQL / MySQL
- **Tools:** Git, GitHub, Postman, VS Code, Eclipse

## Modules
- Authentication & role-based access (Admin / Operator / Villager)
- Asset Management (pumps, tanks, pipelines, valves)
- Daily Monitoring Logs (supply hours, pressure, water quality)
- Complaint Management
- Maintenance Scheduling with automated alerts
- Admin Dashboard with analytics charts

## Project Structure

backend/ -> Spring Boot REST API
frontend/ -> React application


## Setup

### Backend

cd backend
mvn spring-boot:run

Configure DB credentials in `src/main/resources/application.properties`.

### Frontend

cd frontend
npm install
npm start


## Team
- Nikhil Baswal — Team Lead, Full Stack
- Omendra Singh — Backend, Database
- Priyanshu Nama — Full Stack
- Manish Saini — Frontend
