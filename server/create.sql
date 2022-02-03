CREATE DATABASE formfy WITH ENCODING 'UTF8' LC_COLLATE='pt_BR.UTF-8' LC_CTYPE='pt_BR.UTF-8';

CREATE SCHEMA formfy;

CREATE TABLE formfy.form (  
  id serial primary key,
  name text unique not null
);

CREATE TABLE formfy.form_field (
  id serial primary key,
  form_id integer not null,
  label text not null,
  type text not null,
  options text,
  index integer not null,
  unique (form_id, label)
);

CREATE TABLE formfy.registry (
  id serial primary key,
  form_id integer not null  
);

CREATE TABLE formfy.registry_field (
  registry_id integer not null,
  label text not null,
  value text not null,
  unique (registry_id, label)
);

