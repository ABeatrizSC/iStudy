CREATE TABLE IF NOT EXISTS flashcards (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  answer VARCHAR(255) NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  is_hit BIT(1) NOT NULL,
  question VARCHAR(255) NOT NULL,
  flashcard_id VARCHAR(255) NOT NULL
);

ALTER TABLE cards
    ADD CONSTRAINT fk_cards_flashcards_id
    FOREIGN KEY (flashcard_id)
    REFERENCES flashcards(id);

CREATE TABLE IF NOT EXISTS quizzes (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  option_chosen VARCHAR(255) NULL DEFAULT NULL,
  question VARCHAR(255) NOT NULL,
  quiz_id VARCHAR(255) NOT NULL,
  correct_answer BIT(1) NOT NULL
);

ALTER TABLE questions
    ADD CONSTRAINT fk_questions_quizzes_id
    FOREIGN KEY (quiz_id)
    REFERENCES quizzes(id);

CREATE TABLE IF NOT EXISTS options (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  is_correct BIT(1) NOT NULL,
  option_text VARCHAR(255) NOT NULL,
  question_id VARCHAR(255) NOT NULL
);

ALTER TABLE options
    ADD CONSTRAINT fk_options_questions_id
    FOREIGN KEY (question_id)
    REFERENCES questions(id);