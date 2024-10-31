create table message (
	id uuid not null default uuid_generate_v4() primary key,
	conversation_id uuid not null references conversation(id) on delete cascade,
	prompt text not null,
	response text not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);
