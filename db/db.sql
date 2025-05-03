create database delivery_app ;
use delivery_app ;
create table users(
	id bigint primary key auto_increment,
    email varchar(100) not null unique ,
    name varchar(100) not null,
    lastname varchar(100) not null ,
    phone varchar(100) not null unique ,
    image varchar(255) null,
    password varchar(100) not null ,
    created_at timestamp(0) not null ,
    updated_At timestamp(0) not null 
);