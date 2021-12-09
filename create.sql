CREATE DATABASE formfy WITH ENCODING 'UTF8' LC_COLLATE='pt_BR.UTF-8' LC_CTYPE='pt_BR.UTF-8';

CREATE SCHEMA formfy;

CREATE TABLE formfy.form (
  serial serial primary key,
  name text  
);