# Movie Actors ListDetails App

## Project Description

This project is a 3-tier web application that manages movies and actors.

A movie is the master object.  
An actor is the detail object.

One movie can have many actors.

## Project Relationship

Master table: movies  
Detail table: actors  

Example:

- Movie: Black Panther
- Actors:
  - Chadwick Boseman
  - Michael B. Jordan
  - Lupita Nyong'o

## 3-Tier Architecture

### 1. Frontend
The frontend will be a simple web page using Vanilla JavaScript and later React.

### 2. REST API
The middle layer will be a Spring Boot REST API.

### 3. Database
The backend database will store movies and actors using relational tables.

## Phase 1 Goals

- Build a project plan
- Design the database schema
- Create schema.sql
- Create seed.sql with fake data
- Create REST endpoints for movies and actors
- Test endpoints using curl

## Tables

### movies

- id
- title
- genre
- release_year
- director

### actors

- id
- movie_id
- first_name
- last_name
- character_name
- age