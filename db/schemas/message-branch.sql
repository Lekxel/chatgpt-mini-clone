create table message_branch (
	id bigint primary key generated always as identity,
	message_id uuid not null references message(id) on delete cascade,
	prompt text not null,
	response text not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);
