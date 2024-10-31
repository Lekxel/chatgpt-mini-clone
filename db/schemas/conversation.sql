create table conversation (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	title text not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now(),
	deleted_at timestamp
);
