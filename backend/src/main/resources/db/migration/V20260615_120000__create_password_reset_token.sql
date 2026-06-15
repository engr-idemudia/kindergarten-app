-- Password reset tokens
-- Stores a HASH of the reset token (never the raw token), with expiry and single-use tracking.

CREATE TABLE password_reset_token (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT       NOT NULL,
    token_hash  VARCHAR(255) NOT NULL,
    expires_at  TIMESTAMP    NOT NULL,
    used        BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_prt_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_prt_token_hash ON password_reset_token (token_hash);
CREATE INDEX idx_prt_user_id ON password_reset_token (user_id);
