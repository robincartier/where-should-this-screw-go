CREATE TABLE Tags(
  id INT Primary Key Generated Always as Identity,
  tag VARCHAR(50) NOT NULL
);

CREATE TABLE Steps(
  id INT Primary Key Generated Always as Identity,
  image BYTEA NOT NULL
);

CREATE TABLE StepTags(
  stepId INT NOT NULL,
  tagId INT NOT NULL,
  FOREIGN KEY (stepId) REFERENCES Steps(id),
  FOREIGN KEY (tagId) REFERENCES Tags(id),
  constraint pk_StepTags primary key (stepId, tagId)
);