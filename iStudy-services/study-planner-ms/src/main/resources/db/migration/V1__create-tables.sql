CREATE TABLE IF NOT EXISTS schedule_items (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    day_of_week INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS reminders (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    task VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    is_completed BIT(1) NOT NULL
);