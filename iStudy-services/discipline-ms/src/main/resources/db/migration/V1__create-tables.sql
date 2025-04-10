CREATE TABLE IF NOT EXISTS disciplines (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  category ENUM('BIOLOGICAL_SCIENCES', 'BUSINESS_AND_MANAGEMENT', 'EXACT_SCIENCES', 'HEALTH_AND_MEDICINE', 'HUMAN_SCIENCES', 'LANGUAGES', 'TECHNOLOGY_AND_COMPUTING') NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  is_completed BIT(1) NOT NULL,
  name VARCHAR(35) NOT NULL,
  time_completed TIME NOT NULL,
  total_time TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS topics (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  is_completed BIT(1) NOT NULL,
  name VARCHAR(35) NOT NULL,
  time TIME NOT NULL,
  discipline_id VARCHAR(255) NOT NULL
);

 ALTER TABLE topics
        ADD CONSTRAINT fk_topics_disciplines_id
        FOREIGN KEY (discipline_id)
        REFERENCES disciplines(id);