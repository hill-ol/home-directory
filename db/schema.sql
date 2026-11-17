--
-- One row per content module.
--
-- The jsonb payload is exactly the shape the matching src/content module
-- exports today, so every consumer keeps the types it already has. There is
-- no per-entity table on purpose: the whole content set is a few dozen KB
-- with one author, so joins buy nothing and each new field would otherwise
-- cost a migration.
--
-- Derived values stay in code. intro/introInline/introWithClass and
-- metaDescription still compose from the bio atoms, getProject and
-- desktopProjects still filter the projects array, and research still
-- resolves its project references. Only the atoms live here.
--

create table if not exists content (
    key        text primary key,
    data       jsonb not null,
    updated_at timestamptz not null default now()
);

--
-- Touch updated_at on every write, so cache debugging has a real timestamp
-- to read. Note this is NOT the readme's lastModified: that one is hand
-- maintained because it means "when the writing last changed", and a schema
-- tweak should not reset it.
--
create or replace function content_touch_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create or replace trigger content_set_updated_at
    before update on content
    for each row
    execute function content_touch_updated_at();
