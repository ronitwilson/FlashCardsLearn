CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS decks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flashcards (
  id SERIAL PRIMARY KEY,
  word VARCHAR(100) NOT NULL,
  deck_id INTEGER REFERENCES decks(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attempts (
  id SERIAL PRIMARY KEY,
  flashcard_id INTEGER REFERENCES flashcards(id),
  user_id INTEGER REFERENCES users(id),
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (name, age) VALUES 
  ('Child User', 8),
  ('Parent User', 35);

INSERT INTO decks (name, description, user_id) VALUES 
  ('Basic Sight Words', 'Common sight words for beginners', 1),
  ('Advanced Words', 'More complex sight words', 1);

INSERT INTO flashcards (word, deck_id) VALUES 
  ('the', 1), ('and', 1), ('a', 1), ('to', 1), ('in', 1),
  ('is', 1), ('you', 1), ('that', 1), ('it', 1), ('he', 1),
  ('for', 2), ('they', 2), ('with', 2), ('have', 2), ('this', 2);
