-- Seed demo users for all roles
-- Password for all users: password123

INSERT INTO USERS (email, password, full_name, tenant_id)
SELECT 'admin@idemudia.dev', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh7y', 'Demo Admin', 1
WHERE NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'admin@idemudia.dev');

INSERT INTO USERS (email, password, full_name, tenant_id)
SELECT 'teacher@idemudia.dev', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh7y', 'Demo Teacher', 1
WHERE NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'teacher@idemudia.dev');

INSERT INTO USERS (email, password, full_name, tenant_id)
SELECT 'parent@idemudia.dev', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh7y', 'Demo Parent', 1
WHERE NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'parent@idemudia.dev');

INSERT INTO USERS (email, password, full_name, tenant_id)
SELECT 'superadmin@idemudia.dev', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh7y', 'Demo Super Admin', 1
WHERE NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'superadmin@idemudia.dev');

-- Assign roles
INSERT INTO USER_ROLES (user_id, role_id)
SELECT u.id, r.id FROM USERS u, ROLES r
WHERE u.email = 'admin@idemudia.dev' AND r.name = 'KINDERGARTEN_ADMIN'
AND NOT EXISTS (SELECT 1 FROM USER_ROLES WHERE user_id = u.id AND role_id = r.id);

INSERT INTO USER_ROLES (user_id, role_id)
SELECT u.id, r.id FROM USERS u, ROLES r
WHERE u.email = 'teacher@idemudia.dev' AND r.name = 'TEACHER'
AND NOT EXISTS (SELECT 1 FROM USER_ROLES WHERE user_id = u.id AND role_id = r.id);

INSERT INTO USER_ROLES (user_id, role_id)
SELECT u.id, r.id FROM USERS u, ROLES r
WHERE u.email = 'parent@idemudia.dev' AND r.name = 'PARENT'
AND NOT EXISTS (SELECT 1 FROM USER_ROLES WHERE user_id = u.id AND role_id = r.id);

INSERT INTO USER_ROLES (user_id, role_id)
SELECT u.id, r.id FROM USERS u, ROLES r
WHERE u.email = 'superadmin@idemudia.dev' AND r.name = 'SUPER_ADMIN'
AND NOT EXISTS (SELECT 1 FROM USER_ROLES WHERE user_id = u.id AND role_id = r.id);