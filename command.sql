-- Creating Tables

-- Creating Users Table
CREATE TABLE Users(
    first_name varchar(20),
    last_name varchar(20),
    user_id SERIAL PRIMARY KEY
);

-- Creating Modes Table
CREATE TABLE Modes(
    mode_id SERIAL PRIMARY KEY,
    title varchar(20),
    base_fare INTEGER,
    fare_per_km INTEGER
);

-- Creating Locations Table
CREATE TABLE Locations(
    location_id SERIAL PRIMARY KEY,
    x_coordinate INTEGER,
    y_coordinate INTEGER,
    title varchar(20)
);

-- Creating Joureys Table
CREATE TABLE Journeys(
    journey_id SERIAL PRIMARY KEY,
    journey_time TIMESTAMP DEFAULT CURRENT_TIME,
    mode_id INTEGER,
    CONSTRAINT mode_id FOREIGN KEY (mode_id) REFERENCES Modes(mode_id),
    start_location INTEGER,
    CONSTRAINT start_location FOREIGN KEY (start_location) REFERENCES Locations(location_id),
    end_location INTEGER,
    CONSTRAINT end_location FOREIGN KEY (end_location) REFERENCES Locations(location_id),
    fare INTEGER
);

-- Creating Bookings Table
CREATE TABLE Bookings(
    booking_id SERIAL PRIMARY KEY,
    journey_id INTEGER,
    CONSTRAINT journey_id FOREIGN KEY (journey_id) REFERENCES Journeys(journey_id),
    user_id INTEGER,
    CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES Users(user_id)
);